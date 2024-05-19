import { useLocation } from "react-router-dom";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function Breadcrumbs() {
  const path = useLocation();
  const paths = path.pathname.split("/").filter((p) => p);

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {paths.map((p, i) => {
          return (
            <span key={i}>
              <BreadcrumbItem key={i} className="capitalize cursor-default">
                <BreadcrumbLink asChild>
                  <p>{p}</p>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {i < paths.length - 1 && <BreadcrumbSeparator />}
            </span>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default Breadcrumbs;
