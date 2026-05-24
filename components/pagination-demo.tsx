"use client";

import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationGoToPage,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationResultsPerPage,
} from "@/components/ui/pagination";

export function PaginationDemo() {
  const [activePage, setActivePage] = useState(1);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActivePage(Math.max(1, activePage - 1));
            }}
          />
        </PaginationItem>
        {[1, 2, 3, 4, 5].map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              isActive={page === activePage}
              onClick={(e) => {
                e.preventDefault();
                setActivePage(page);
              }}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActivePage(Math.min(5, activePage + 1));
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export function PaginationNearFirstDemo() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">10</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export function PaginationNearEndDemo() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">8</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">9</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>10</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export function PaginationMiddleDemo() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">4</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>5</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">6</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">10</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export function PaginationFullDemo() {
  const totalPages = 20
  const [activePage, setActivePage] = useState(1)
  const [resultsPerPage, setResultsPerPage] = useState(10)

  function handleGoToPage(page: number) {
    if (page >= 1 && page <= totalPages) {
      setActivePage(page)
    }
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row items-center sm:justify-between w-full">
      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault()
                setActivePage(Math.max(1, activePage - 1))
              }}
            />
          </PaginationItem>
          {[1, 2, 3, 4, 5].map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={page === activePage}
                onClick={(e) => {
                  e.preventDefault()
                  setActivePage(page)
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault()
                setActivePage(Math.min(5, activePage + 1))
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <div className="flex items-center gap-3">
        <PaginationGoToPage onGoToPage={handleGoToPage} />
        <PaginationResultsPerPage
          value={resultsPerPage}
          onValueChange={setResultsPerPage}
        />
      </div>
    </div>
  )
}

export function PaginationWithEllipsisDemo() {
  const totalPages = 10;
  const [activePage, setActivePage] = useState(1);

  function renderPage(page: number) {
    return (
      <PaginationItem key={page}>
        <PaginationLink
          href="#"
          isActive={page === activePage}
          onClick={(e) => {
            e.preventDefault();
            setActivePage(page);
          }}
        >
          {page}
        </PaginationLink>
      </PaginationItem>
    );
  }

  function buildPages() {
    const items: React.ReactNode[] = [];

    if (activePage <= 3) {
      // Near first: [1, 2, 3, ..., 10]
      items.push(renderPage(1), renderPage(2), renderPage(3));
      items.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis />
        </PaginationItem>
      );
      items.push(renderPage(totalPages));
    } else if (activePage >= 8) {
      // Near end: [1, ..., 8, 9, 10]
      items.push(renderPage(1));
      items.push(
        <PaginationItem key="ellipsis-start">
          <PaginationEllipsis />
        </PaginationItem>
      );
      items.push(renderPage(8), renderPage(9), renderPage(10));
    } else {
      // Middle: [1, ..., active-1, active, active+1, ..., 10]
      items.push(renderPage(1));
      items.push(
        <PaginationItem key="ellipsis-start">
          <PaginationEllipsis />
        </PaginationItem>
      );
      items.push(
        renderPage(activePage - 1),
        renderPage(activePage),
        renderPage(activePage + 1)
      );
      items.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis />
        </PaginationItem>
      );
      items.push(renderPage(totalPages));
    }

    return items;
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActivePage(Math.max(1, activePage - 1));
            }}
          />
        </PaginationItem>
        {buildPages()}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActivePage(Math.min(totalPages, activePage + 1));
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
