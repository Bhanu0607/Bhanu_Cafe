/**
 * Generates a unique Application ID.
 * Format: BCC-YYYYMMDD-XXXX
 * Example: BCC-20260801-0043
 */
export function generateApplicationId(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const random = Math.floor(1000 + Math.random() * 9000); // 4-digit number
  return `BCC-${year}${month}${day}-${random}`;
}
