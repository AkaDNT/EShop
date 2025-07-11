"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiSolidCategory } from "react-icons/bi";
import { FaHome, FaShoppingCart, FaBars } from "react-icons/fa";
import { BsFillBarChartFill, BsPhoneFill } from "react-icons/bs";
import { MdAddBox } from "react-icons/md";
import { HiCollection } from "react-icons/hi";
import { LuLogOut } from "react-icons/lu";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  sidebarClasses,
} from "react-pro-sidebar";

const Side = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedItem, setSelectedItem] = useState("/admin/dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setSelectedItem(pathname);
  }, [pathname]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleItemClick = (link: string) => {
    setSelectedItem(link);
    setIsSidebarOpen(false);
    router.push(link);
  };

  const menuItems = [
    { label: "Dashboard", icon: <FaHome />, link: "/admin/dashboard" },
    {
      label: "Category",
      icon: <BiSolidCategory />,
      subMenuItems: [
        {
          label: "Add Category",
          icon: <MdAddBox />,
          link: "/admin/category/add-category",
        },
        {
          label: "All Category",
          icon: <HiCollection />,
          link: "/admin/category/all-category",
        },
        {
          label: "Reports",
          icon: <BsFillBarChartFill />,
          link: "/admin/category/reports",
        },
      ],
    },
    {
      label: "Product",
      icon: <BsPhoneFill />,
      subMenuItems: [
        {
          label: "Add Product",
          icon: <MdAddBox />,
          link: "/admin/products/add-product",
        },
        {
          label: "All Products",
          icon: <HiCollection />,
          link: "/admin/products/all-products",
        },
        {
          label: "Reports",
          icon: <BsFillBarChartFill />,
          link: "/admin/products/reports",
        },
      ],
    },
    { label: "Orders", icon: <FaShoppingCart />, link: "/admin/orders" },
  ];

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden p-4 flex items-center justify-between bg-[color:var(--color-amazon-dark)] text-white">
        <button onClick={toggleSidebar} className="text-2xl">
          <FaBars />
        </button>
      </div>

      {/* Overlay: Only shows on mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 z-50 h-full transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:block
          bg-[color:var(--color-amazon-dark)]
        `}
      >
        <Sidebar
          className="h-full"
          rootStyles={{
            [`.${sidebarClasses.container}`]: {
              backgroundColor: "#141B24",
              height: "100vh",
            },
          }}
        >
          <Menu
            className="text-white"
            menuItemStyles={{
              button: ({ level, active }) => {
                const bg = level === 0 ? "#141B24" : "#222e3d";
                return {
                  backgroundColor: active ? "#ff9900" : bg,
                  "&:hover": {
                    backgroundColor: active ? "#212c3a" : "#2c3a4d",
                  },
                };
              },
            }}
          >
            <div className="flex items-center justify-center my-6">
              <Image
                src="/logo.png"
                alt="logo"
                height={120}
                width={120}
                className="cursor-pointer"
                onClick={() => router.push("/admin/dashboard")}
              />
            </div>

            {menuItems.map((item, index) =>
              item.subMenuItems ? (
                <SubMenu key={index} label={item.label} icon={item.icon}>
                  {item.subMenuItems.map((subItem, subIndex) => (
                    <MenuItem
                      key={subIndex}
                      icon={subItem.icon}
                      active={selectedItem === subItem.link}
                      onClick={() => handleItemClick(subItem.link)}
                    >
                      {subItem.label}
                    </MenuItem>
                  ))}
                </SubMenu>
              ) : (
                <MenuItem
                  key={index}
                  icon={item.icon}
                  active={selectedItem === item.link}
                  onClick={() => handleItemClick(item.link)}
                >
                  {item.label}
                </MenuItem>
              )
            )}

            <MenuItem
              onClick={() => handleItemClick("/admin/logout")}
              icon={<LuLogOut />}
              active={selectedItem === "/admin/logout"}
            >
              Logout
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </>
  );
};

export default Side;
