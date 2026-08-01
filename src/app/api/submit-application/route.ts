import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { generateApplicationId } from '@/lib/applicationId';
import { generateEmailHTML } from '@/lib/emailTemplate';
import { checkRateLimit } from '@/lib/rateLimit';

// Use Node.js runtime for Buffer support
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ALLOWED_TYPES = new Set([
  'application/pdf',
  'image/png',
  'image/jpeg',
  'image/jpg',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // docx
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // xlsx
  'application/zip',
  'application/x-zip-compressed',
]);

const MAX_FILE_SIZE = 5 * 1024 * 1024;       // 5 MB per file
const MAX_TOTAL_SIZE = 20 * 1024 * 1024;     // 20 MB total

// Sanitize filename: strip path traversal, keep only safe chars
function sanitizeFilename(name: string): string {
  return name
    .replace(/[^a-zA-Z0-9._\- ]/g, '_')
    .replace(/\.{2,}/g, '_')
    .slice(0, 100)
    .trim();
}

// Sanitize text input
function sanitizeText(str: unknown): string {
  if (typeof str !== 'string') return '';
  return str.trim().slice(0, 2000);
}

export async function POST(request: NextRequest) {
  // --- Rate Limiting ---
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  const rateResult = checkRateLimit(ip);
  if (!rateResult.allowed) {
    return NextResponse.json(
      { error: 'Too many submissions. Please try again in 1 hour.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil((rateResult.resetAt - Date.now()) / 1000)),
        },
      }
    );
  }

  // --- Parse FormData ---
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: 'Invalid request format.' }, { status: 400 });
  }

  // --- Extract & Validate Text Fields ---
  const serviceName = sanitizeText(formData.get('serviceName'));
  const serviceSlug = sanitizeText(formData.get('serviceSlug'));
  const fullName = sanitizeText(formData.get('fullName'));
  const mobile = sanitizeText(formData.get('mobile'));
  const email = sanitizeText(formData.get('email'));
  const address = sanitizeText(formData.get('address'));
  const message = sanitizeText(formData.get('message'));

  // Validate required fields
  if (!serviceName || !fullName || !mobile || !email || !address) {
    return NextResponse.json(
      { error: 'Missing required fields: name, mobile, email, and address are required.' },
      { status: 400 }
    );
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
  }

  // Validate mobile
  const mobileDigits = mobile.replace(/\D/g, '');
  if (mobileDigits.length !== 10) {
    return NextResponse.json({ error: 'Mobile number must be exactly 10 digits.' }, { status: 400 });
  }

  // --- Extract & Validate Files ---
  const rawFiles = formData.getAll('files') as File[];
  const validFiles = rawFiles.filter((f) => f instanceof File && f.size > 0);

  // Check individual file size and type
  for (const file of validFiles) {
    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: `File "${file.name}" has an unsupported type. Only PDF, PNG, JPG, and JPEG are allowed.` },
        { status: 400 }
      );
    }
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File "${file.name}" exceeds the 5 MB size limit.` },
        { status: 400 }
      );
    }
  }

  // Check total size
  const totalSize = validFiles.reduce((sum, f) => sum + f.size, 0);
  if (totalSize > MAX_TOTAL_SIZE) {
    return NextResponse.json(
      { error: 'Total upload size exceeds 20 MB. Please reduce the number or size of files.' },
      { status: 400 }
    );
  }

  // --- Convert Files to Buffers ---
  const fileBuffers: { filename: string; content: Buffer; size: number }[] = [];
  try {
    for (const file of validFiles) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      fileBuffers.push({
        filename: sanitizeFilename(file.name),
        content: buffer,
        size: file.size,
      });
    }
  } catch {
    return NextResponse.json(
      { error: 'Failed to process uploaded files. Please try again.' },
      { status: 500 }
    );
  }

  // --- Generate Application ID ---
  const applicationId = generateApplicationId();

  // --- Build Email ---
  const submittedAt = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'long',
    timeStyle: 'short',
  });

  const htmlBody = generateEmailHTML({
    applicationId,
    serviceName,
    fullName,
    mobile: mobileDigits,
    email,
    address,
    message: message || undefined,
    attachmentNames: fileBuffers.map((f) => f.filename),
    submittedAt,
  });

  // --- Send Email via Resend ---
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@bhanucafe.in';
  const toEmail = process.env.RESEND_TO_EMAIL || 'Bhuveshbansal01@gmail.com';

  if (!apiKey) {
    console.error('RESEND_API_KEY is not set in environment variables.');
    return NextResponse.json(
      { error: 'Email service is not configured. Please contact us directly.' },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

  try {
    const { error: resendError } = await resend.emails.send({
      from: `Bhanu Cyber Cafe <${fromEmail}>`,
      to: [toEmail],
      replyTo: email,
      subject: `New ${serviceName} Application — ${applicationId}`,
      html: htmlBody,
      attachments: fileBuffers.map((f) => ({
        filename: f.filename,
        content: f.content,
      })),
    });

    if (resendError) {
      console.error('Resend API error:', resendError);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error('Email sending exception:', err);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  } finally {
    // --- Immediately discard file buffers from memory ---
    for (const f of fileBuffers) {
      (f as { content: Buffer | null }).content = null;
    }
    fileBuffers.length = 0;
  }

  // --- Success ---
  return NextResponse.json({ success: true, applicationId }, { status: 200 });
}
