const sheetUrl = process.env.SHEET_API_URL;

const optimizeCloudinaryUrl = (url) => {
  if (!url?.includes("res.cloudinary.com")) return url;
  return url.replace("/upload/", "/upload/w_800,q_auto,f_auto/");
};

export async function getAllProducts() {
  const res = await fetch(sheetUrl, { next: { revalidate: 60 } });
  const data = await res.json();

  return data.map((item, idx) => {
    const imageKeys = Object.keys(item).filter(key => key.startsWith("image"));
    const images = imageKeys
      .map(key => item[key])
      .filter(Boolean)
      .map(optimizeCloudinaryUrl);

    return {
      id: item.id?.toString() || idx.toString(),
      title: item.title,
      description: item.description,
      price: item.price,
      offer: item.offer,
      aboutProduct: item.aboutProduct,
      days: item.days,
      time: item.time,
      images,
      type: item.type,
    };
  });
}

