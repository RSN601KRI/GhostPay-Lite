// util.js (ES Module)
export async function doSomeHeavyTask() {
  const start = Date.now();
  // Simulate heavy work (2 seconds delay)
  await new Promise(resolve => setTimeout(resolve, 2000));
  return Date.now() - start;
}
