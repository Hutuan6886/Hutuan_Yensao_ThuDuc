// 🧠 Hàm xử lý async background (có thể thay bằng Upstash, Cloudflare Worker...)
async function backgroundJob(job: () => Promise<void>) {
  job().catch((err) => console.error("Background job failed:", err));
}

export default backgroundJob;
