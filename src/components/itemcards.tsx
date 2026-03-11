import type { Item } from "../Types/info";

const badgeColors: Record<Item["badge"], string> = {
  "FIXED PRICE": "bg-[#f48c25] text-white",
  "BIDDING": "bg-blue-50 text-blue-500",
  "FREE": "bg-green-50 text-green-500",
};

type ItemCardProps = {
  item: Item;
};

export default function ItemCard({ item }: ItemCardProps) {
  const badge: Item["badge"] = item.badge ?? (item.is_free ? "FREE" : "FIXED PRICE");
  const imgSrc = item.image_url || item.image;
  const categoryName = item.categories?.name ?? item.category?.name ?? "Uncategorized";
  const ownerName = item.profiles?.full_name ?? item.owner?.username ?? "Unknown";

  return (
    <div className="relative z-0 bg-white border border-[#F48C2520] rounded-2xl overflow-hidden hover:shadow-md transition-shadow cursor-pointer font-[Inter]">
      <div className="h-48 bg-[#f5f0e8] flex items-center justify-center relative">
        {imgSrc ? (
          <span className="w-full h-full">
            <div className="w-full h-full bg-black/30 absolute"></div>
            <img className="w-full h-full object-cover" src={imgSrc} alt={item.title} />
          </span>
        ) : (
          <span className="text-slate-300 text-sm">No Image</span>
        )}
        <span
          className={`absolute top-2 left-2 text-xs max-md:text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-sm font-[Inter] ${badgeColors[badge]}`}
        >
          {badge}
        </span>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="font-semibold text-slate-900 text-base max-md:text-sm">
          {item.title}
        </p>
        <p className="text-xs text-slate-400 mb-1">{categoryName}</p>
        {item.is_free ? (
          <p className="text-green-500 font-bold">FREE</p>
        ) : (
          <p className="text-[#F48C25] font-bold">${item.price.toFixed(2)}</p>
        )}
        <p className="text-xs text-slate-400 mt-1">by {ownerName}</p>
      </div>
    </div>
  );
}
