const sheetUrl = process.env.SHEET_API_URL;

const optimizeCloudinaryUrl = (url) => {
  if (!url?.includes("res.cloudinary.com")) return url;
  return url.replace("/upload/", "/upload/w_800,q_auto,f_auto/");
};

export async function getAllProducts() {
  if (!sheetUrl) return [];

  try {
    const res = await fetch(sheetUrl, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data = await res.json();

    if (!Array.isArray(data)) return [];

    return data.map((item, idx) => {
      const imageKeys = Object.keys(item).filter(key => key.startsWith("image"));
      const images = imageKeys
        .map(key => item[key])
        .filter(Boolean)
        .map(optimizeCloudinaryUrl);

      return {
        id: item.id?.toString() || idx.toString(),
        title: item.title || "",
        description: item.description || "",
        price: item.price || 0,
        offer: item.offer || null,
        aboutProduct: item.aboutProduct || "",
        days: item.days || "",
        time: item.time || "",
        images,
        type: item.type || "",
      };
    });
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

