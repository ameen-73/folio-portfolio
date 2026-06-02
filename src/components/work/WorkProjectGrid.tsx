"use client";

import { useMemo, useState } from "react";
import { CategoryFilter } from "@/components/ui/CategoryFilter";
import { ProjectCardsGrid } from "@/components/work/ProjectCardsGrid";
import { buildCategoryTabs } from "@/lib/categories";
import type { Project } from "@/lib/site";

type Props = {
    projects: Project[];
    filterClassName?: string;
};

export function WorkProjectGrid({ projects, filterClassName = "mt-10" }: Props) {
    const tabs = useMemo(() => buildCategoryTabs(projects), [projects]);
    const [activeCategory, setActiveCategory] = useState("All");

    const filtered = useMemo(() => {
        if (activeCategory === "All") return projects;
        return projects.filter((p) => p.category === activeCategory);
    }, [projects, activeCategory]);

    return (
        <>
            <CategoryFilter
                className={filterClassName}
                categories={tabs}
                active={activeCategory}
                onChange={setActiveCategory}
            />

            <ProjectCardsGrid projects={filtered} className="mt-10" />
        </>
    );
}
