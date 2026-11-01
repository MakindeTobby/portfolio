import Image from "next/image";

type BrandMarkProps = {
  size?: "header" | "footer";
};

export function BrandMark({ size = "header" }: BrandMarkProps) {
  const dimension = size === "footer" ? "size-9" : "size-8";

  return (
    <span
      aria-hidden="true"
      className={`relative ${dimension} inline-block shrink-0 overflow-hidden rounded-full border border-white/20 bg-[#f4ad1c]`}
    >
      <Image
        src="/favicon.png"
        alt=""
        width={96}
        height={129}
        sizes={size === "footer" ? "36px" : "32px"}
        className="absolute left-1/2 top-0 h-[160%] w-[160%] max-w-none -translate-x-1/2 object-cover object-top"
      />
    </span>
  );
}
