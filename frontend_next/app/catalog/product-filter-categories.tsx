"use client";
import { TreeCategoryDto } from "@backend/modules/categories/dtos/tree.dto";
import { Button } from "@frontend_next/components/ui/button";
import { ScrollArea } from "@frontend_next/components/ui/scroll-area";
import { apiClient } from "@frontend_next/lib/eden";
import { cn } from "@frontend_next/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const ProductFilterCategories = () => {
  const [expandedNodes, setExpandedNodes] = useState<string[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const toggleNode = (nodeId: string) => {
    setExpandedNodes((prevExpanded) =>
      prevExpanded.includes(nodeId)
        ? prevExpanded.filter((id) => id !== nodeId)
        : [...prevExpanded, nodeId]
    );
  };

  const handleSelect = (nodeId: string) => {
    setSelectedNode(nodeId);
  };
  const { data, isLoading } = useQuery({
    queryKey: ["catalog_categories"],
    queryFn: async () => {
      const { data } = await apiClient.api.categories.public.tree.get();
      return data;
    },
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const pathname = usePathname();

  const renderMenu = (items: TreeCategoryDto[]) => {
    return (
      <ul className="grid gap-1">
        {items.map((item) => {
          const isActive = pathname === `/catalog/${item.code}`;
          return (
            <li key={item.id} className="group relative">
              <Link
                href={`/catalog/${item.code}`}
                className={cn(
                  "group flex items-center justify-between gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                  {
                    "bg-content3 text-accent-foreground": isActive,
                    "hover:bg-content3 hover:text-accent-foreground": !isActive,
                  }
                )}
                prefetch={false}
              >
                <span>{item.name}</span>
                {item.children.length > 0 && (
                  <ChevronRightIcon className="h-4 w-4 transition-transform group-hover:rotate-90" />
                )}
              </Link>
              {item.children.length > 0 && (
                <div className="pl-4 h-0 invisible group-hover:h-auto group-hover:visible">
                  {renderMenu(item.children)}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  if (isLoading) {
    return <div></div>;
  } else if (data && Array.isArray(data) && data.length > 0) {
    return (
      <div className="text-foreground space-y-1">
        <nav className="w-full">
          {data.map((category) => (
            <TreeNode
              key={category.id}
              node={category}
              level={1}
              expandedNodes={expandedNodes}
              toggleNode={toggleNode}
              onSelect={handleSelect}
            />
          ))}
        </nav>
      </div>
    );
  } else {
    return <div></div>;
  }
};

const TreeNode = ({
  node,
  level,
  expandedNodes,
  toggleNode,
  onSelect,
}: {
  node: TreeCategoryDto;
  level: number;
  expandedNodes: string[];
  toggleNode: (id: string) => void;
  onSelect: (id: string) => void;
}) => {
  const pathname = usePathname();
  const isExpanded = expandedNodes.includes(node.id);
  const hasChildren = node.children && node.children.length > 0;
  const isActive = pathname === `/catalog/${node.code}`;
  const isChildActive =
    hasChildren &&
    node.children.some((child) =>
      pathname.startsWith(`/catalog/${child.code}`)
    );

  const shouldBeExpanded = isExpanded || isChildActive;

  return (
    <div>
      <Link href={`/catalog/${node.code}`} passHref>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start hover:bg-primary hover:text-primary-foreground",
            level > 0 && `pl-${level * 4}`,
            isActive && "bg-primary text-primary-foreground",
            isChildActive && "font-bold"
          )}
        >
          {hasChildren && (
            <span className="mr-2">
              <motion.div
                initial={false}
                animate={{ rotate: shouldBeExpanded ? 90 : 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => {
                  e.preventDefault();
                  if (hasChildren) {
                    toggleNode(node.id);
                  }
                }}
              >
                <ChevronRight size={16} />
              </motion.div>
            </span>
          )}
          {node.name}
        </Button>
      </Link>
      <AnimatePresence initial={!shouldBeExpanded}>
        {hasChildren && (
          <motion.div
            key={node.id}
            initial="collapsed"
            animate={shouldBeExpanded ? "expanded" : "collapsed"}
            exit="collapsed"
            variants={{
              expanded: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.2 }}
            style={{ overflow: "hidden" }}
          >
            {node.children.map((child) => (
              <TreeNode
                key={child.id}
                node={child}
                level={level + 1}
                expandedNodes={expandedNodes}
                toggleNode={toggleNode}
                onSelect={onSelect}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
