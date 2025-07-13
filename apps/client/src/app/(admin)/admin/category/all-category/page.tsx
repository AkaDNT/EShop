"use client";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Pagination,
  Tooltip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import { FaEdit, FaSearch, FaTrashAlt } from "react-icons/fa";
import { columns } from "./data";
import { deleteCategory, getAllCategories } from "@/lib/api/category";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/store";

interface Count {
  products: number;
}

interface Category {
  createdAt: string;
  id: string;
  name: string;
  updatedAt: string;
  _count: Count;
}

type ValidColumnNames = keyof Category;

export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Set<string> | "all">(
    new Set()
  );
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "name",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { setToast } = useAppStore();
  const router = useRouter();

  useEffect(() => {
    getAllCategories().then((results) => {
      if (results) setCategories(results);
    });
  }, []);

  const handleDelete = useCallback(
    (category: Category) => {
      if (category._count.products > 0) {
        return setToast("Cannot delete category with products.");
      }
      setDeleteId(category.id);
      onOpen();
    },
    [setToast, onOpen]
  );

  const confirmDelete = async () => {
    if (!deleteId) return;
    const res = await deleteCategory(deleteId);
    if (res.status === 200) {
      setCategories((prev) => prev.filter((c) => c.id !== deleteId));
      setToast("Category deleted successfully.");
    } else {
      setToast("Unable to delete category.");
    }
    onClose();
  };

  const handleEdit = useCallback(
    (id: string) => router.push(`/admin/category/edit-category/${id}`),
    [router]
  );

  const hasSearchFilter = Boolean(filterValue.trim());

  const filteredItems = useMemo(() => {
    if (!hasSearchFilter) return categories;
    return categories.filter((c) =>
      c.name.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [categories, filterValue, hasSearchFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage) || 1;

  const pagedItems = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredItems.slice(start, start + rowsPerPage);
  }, [filteredItems, page, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...pagedItems].sort((a, b) => {
      const first = a[sortDescriptor.column as ValidColumnNames];
      const second = b[sortDescriptor.column as ValidColumnNames];
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [pagedItems, sortDescriptor]);

  const renderCell = useCallback(
    (category: Category, columnKey: string) => {
      switch (columnKey) {
        case "products":
          return <span>{category._count.products}</span>;
        case "actions":
          return (
            <div className="flex items-center gap-4 text-lg">
              <Tooltip content="Edit Category" placement="left">
                <button
                  className="text-primary hover:opacity-75 transition"
                  onClick={() => handleEdit(category.id)}
                >
                  <FaEdit />
                </button>
              </Tooltip>
              <Tooltip
                color="danger"
                content="Delete Category"
                placement="right"
              >
                <button
                  className="text-danger hover:opacity-75 transition"
                  onClick={() => handleDelete(category)}
                >
                  <FaTrashAlt />
                </button>
              </Tooltip>
            </div>
          );
        case "createdAt":
        case "updatedAt":
        case "id":
        case "name":
          return <span>{String(category[columnKey as keyof Category])}</span>;
        default:
          return <span>-</span>;
      }
    },
    [handleEdit, handleDelete]
  );

  const topContent = useMemo(
    () => (
      <div className="flex flex-wrap justify-between items-center gap-4">
        {/* Search */}
        <div className="flex items-center gap-2 w-full md:w-auto flex-1 min-w-[250px]">
          <FaSearch className="text-white opacity-70" />
          <Input
            variant="bordered"
            radius="lg"
            size="lg"
            placeholder="Search by category name..."
            className="w-full"
            value={filterValue}
            onValueChange={(v) => setFilterValue(v)}
          />
        </div>

        {/* Add + Rows-per-page */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-end w-full md:w-auto">
          <Button
            color="primary"
            radius="full"
            size="lg"
            className="shrink-0 px-6 h-10 bg-[color:var(--color-amazon-primary)] text-black font-semibold hover:bg-[color:var(--color-amazon-secondary)] rounded-2xl"
            onClick={() => router.push("/admin/category/add-category")}
          >
            Add New Category +
          </Button>

          <label className="flex items-center gap-2 text-sm text-default-400">
            Rows per page:
            <select
              className="bg-transparent border border-white/20 px-2 py-1 rounded-md text-white text-sm outline-none"
              defaultValue={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setPage(1);
              }}
            >
              {[5, 10, 15].map((v) => (
                <option key={v} value={v} className="text-black">
                  {v}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
    ),
    [filterValue, rowsPerPage, router]
  );

  const bottomContent = useMemo(
    () => (
      <div className="py-4 px-2 flex flex-col sm:flex-row items-center justify-center gap-4 border-t border-white/10 mt-6">
        {/* Nút Previous / Next */}
        <Button
          size="sm"
          radius="full"
          variant="bordered"
          className="text-sm font-medium"
          isDisabled={page === 1}
          onPress={() => setPage((p) => Math.max(p - 1, 1))}
        >
          ⬅ Previous
        </Button>
        {/* Pagination số */}

        <span className="text-sm text-gray-400">
          Page <strong>{page}</strong> of <strong>{pages}</strong>
        </span>
        <Button
          size="sm"
          radius="full"
          variant="bordered"
          className="text-sm font-medium"
          isDisabled={page === pages}
          onPress={() => setPage((p) => Math.min(p + 1, pages))}
        >
          Next ➡
        </Button>
      </div>
    ),
    [selectedKeys, filteredItems.length, page, pages]
  );

  return (
    <div className="bg-[color:var(--color-amazon-dark)] min-h-screen p-4 sm:p-6 md:p-10 text-white w-full">
      <div className="mx-auto w-full max-w-6xl">
        <Table
          aria-label="Category table"
          topContent={topContent}
          topContentPlacement="outside"
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          classNames={{
            wrapper:
              "rounded-xl shadow-lg ring-1 ring-white/10 bg-white/5 backdrop-blur-md overflow-x-auto",
            th: "bg-transparent",
          }}
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
                allowsSorting={column.sortable}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>

          <TableBody emptyContent="No category found" items={sortedItems}>
            {(item) => (
              <TableRow key={item.id} className="hover:bg-white/10 transition">
                {(columnKey) => (
                  <TableCell className="py-4 px-6 whitespace-nowrap">
                    {renderCell(item, columnKey as string)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-lg font-semibold">
                Delete category?
              </ModalHeader>
              <ModalBody>
                <p>This action is irreversible.</p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="danger" onPress={confirmDelete}>
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
