import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { BiChevronDown } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/store";
import {
  Listbox,
  ListboxItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";

type CategoryType = {
  createdAt: string;
  id: string;
  name: string;
  updatedAt: string;
  _count: { products: number };
};

const Navbar = () => {
  const { userInfo } = useAppStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [categoriesPopover, setCategoriesPopover] = useState(false);
  const [detailsPopover, setDetailsPopover] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // fetch or compute categories here
    setCategories([]);
  }, []);

  const handleSearch = () => router.push(`/search?query=${searchTerm}`);

  return (
    <nav
      className="
        bg-[color:var(--color-amazon-dark)]
        text-white
        flex flex-wrap items-center
        gap-3 sm:gap-6 lg:gap-10
        px-4 sm:px-6 lg:px-10
        py-2
        min-h-[12vh]
      "
    >
      {/* ----------  Logo ---------- */}
      <Link href="/" className="shrink-0 order-1 sm:order-none">
        <Image src="/logo.png" alt="logo" height={40} width={100} />
      </Link>

      {/* ----------  Categories (hidden on xs to save space) ---------- */}
      <Popover
        placement="bottom"
        showArrow
        backdrop="blur"
        isOpen={categoriesPopover}
        onOpenChange={setCategoriesPopover}
      >
        <PopoverTrigger>
          <button
            className="
              hidden sm:flex items-end gap-1
              cursor-pointer select-none
              order-3 sm:order-none
            "
          >
            <div className="flex flex-col leading-none">
              <span className="text-xs">Select</span>
              <span className="font-semibold text-sm">Category</span>
            </div>
            <BiChevronDown className="text-lg" />
          </button>
        </PopoverTrigger>

        <PopoverContent>
          <div className="p-2 w-full max-w-[660px]">
            <Listbox
              aria-label="Categories"
              onAction={(key) => {
                router.push(`/search?category=${key}`);
                setCategoriesPopover(false);
              }}
              className="grid grid-cols-2 sm:grid-cols-3"
            >
              {categories.map((c) => (
                <ListboxItem key={c.id}>{c.name}</ListboxItem>
              ))}
            </Listbox>
          </div>
        </PopoverContent>
      </Popover>

      {/* ----------  Search ---------- */}
      <div
        className="
          order-4 sm:order-none
          flex w-full sm:flex-1
          bg-gray-200 rounded-2xl
        "
      >
        <input
          type="text"
          placeholder="Search products"
          className="
            flex-1 h-10 sm:h-12 text-black rounded-l-2xl
            px-4 outline-none
          "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button
          onClick={handleSearch}
          className="
            h-10 sm:h-12 w-12 sm:w-14
            bg-[color:var(--color-amazon-primary)]
            hover:bg-[color:var(--color-amazon-secondary)]
            rounded-r-2xl flex items-center justify-center
            transition
            text-xl
          "
        >
          <FiSearch />
        </button>
      </div>

      {/* ----------  Account / Login ---------- */}
      {!userInfo ? (
        <button
          onClick={() => router.push("/login")}
          className="
            order-2 sm:order-none
            text-sm sm:text-base font-semibold
            hover:underline
          "
        >
          Login
        </button>
      ) : (
        <Popover
          placement="bottom"
          showArrow
          backdrop="blur"
          isOpen={detailsPopover}
          onOpenChange={setDetailsPopover}
        >
          <PopoverTrigger>
            <button
              className="
                order-2 sm:order-none
                flex items-end gap-1 cursor-pointer select-none
              "
            >
              <div className="flex flex-col leading-none">
                <span className="text-xs">
                  Hello, {userInfo.username.split("@")[0]}
                </span>
                <span className="font-semibold text-sm">
                  Account &amp; Orders
                </span>
              </div>
              <BiChevronDown className="text-lg" />
            </button>
          </PopoverTrigger>

          <PopoverContent>
            <div className="p-2 w-full max-w-[260px]">
              <Listbox
                aria-label="Account actions"
                onAction={(key) => {
                  router.push(key as string);
                  setDetailsPopover(false);
                }}
              >
                <ListboxItem key="/my-orders">My Orders</ListboxItem>
                <ListboxItem
                  key="/logout"
                  color="danger"
                  className="text-danger"
                >
                  Logout
                </ListboxItem>
              </Listbox>
            </div>
          </PopoverContent>
        </Popover>
      )}

      {/* ----------  Cart ---------- */}
      <button
        onClick={() => router.push("/cart")}
        className="
          shrink-0 order-5 sm:order-none
          flex items-center gap-1
        "
      >
        <Image src="/cart.png" alt="cart" height={32} width={32} />
        <span className="text-sm sm:text-base font-medium">Cart</span>
      </button>
    </nav>
  );
};

export default Navbar;
