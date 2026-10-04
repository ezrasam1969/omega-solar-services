export function calculateClosingPrice(
  actualProjectCost,
  subsidy,
  discount = 0,
) {
  return actualProjectCost - subsidy - discount;
}
