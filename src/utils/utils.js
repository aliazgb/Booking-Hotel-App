export function calculateFinalPrice(startDate, endDate, pricePerNight) {
  const differenceInDays = Math.floor(
    (endDate - startDate) / (1000 * 60 * 60 * 24) 
  );
  const finalPrice = differenceInDays * pricePerNight;
  
  return { differenceInDays, finalPrice };
}