"use client";

import React, { useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "next-themes";
import Image from "next/image";

const ThemeSwitch = () => {
  const [mounted, setMounted] = React.useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    <Image
      src="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=="
      alt="Loadig Light/Dark Mode"
      priority={false}
      title="Loading Light/Dark Mode"
      width={36}
      height={36}
      sizes="36x36"
    />;
  }

  if (resolvedTheme === "dark") {
    return (
      <div>
        <span className="flex gap-2 cursor-pointer" onClick={() => setTheme("light")}>
          <FiSun size={24} />
          Light
        </span>
      </div>
    );
  }

  if (resolvedTheme === "light") {
    return (
      <div>
        <span className="flex gap-2 cursor-pointer" onClick={() => setTheme("dark")}>
          <FiMoon size={24} />
          Dark
        </span>
      </div>
    );
  }
};

export default ThemeSwitch;
