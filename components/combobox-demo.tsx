"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
} from "@/components/ui/combobox";
import { Icon } from "./ui/icon";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

const countries = [
  { code: "", value: "", label: "Select country" },
  { code: "ar", value: "argentina", label: "Argentina" },
  { code: "au", value: "australia", label: "Australia" },
  { code: "br", value: "brazil", label: "Brazil" },
  { code: "ca", value: "canada", label: "Canada" },
  { code: "fr", value: "france", label: "France" },
  { code: "de", value: "germany", label: "Germany" },
  { code: "jp", value: "japan", label: "Japan" },
  { code: "us", value: "united-states", label: "United States" },
];

export function ComboboxPopupDemo() {
  return (
    <Combobox items={countries} >
      <ComboboxTrigger className="w-64 ">
        <Icon name="category" />
        <ComboboxValue placeholder="Select a country" />
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxInput showTrigger={false} placeholder="Search" />
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item.code} value={item}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

export function ComboboxPrimaryFlatDemo() {
  return (
    <Combobox items={countries}>
      <ComboboxTrigger variant="primary-light" className="w-64">
        <Icon name="category" className="text-primary-med-em" />
        <ComboboxValue placeholder="Select a country" />
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxInput showTrigger={false} placeholder="Search" />
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item.code} value={item}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

export function ComboboxGhostDemo() {
  return (
    <Combobox items={countries}>
      <ComboboxTrigger variant="ghost" className="w-64">
        <Icon name="category" className="text-muted-foreground" />
        <ComboboxValue placeholder="Select a country" />
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxInput showTrigger={false} placeholder="Search" />
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item.code} value={item}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

export function ComboboxOutlineDemo() {
  return (
    <Combobox items={countries}>
      <ComboboxTrigger variant="outline" className="w-64">
        <Icon name="category" />
        <ComboboxValue placeholder="Select a country" />
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxInput showTrigger={false} placeholder="Search" />
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item.code} value={item}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

export function ComboboxGroupedDemo() {
  return (
    <Combobox defaultValue="next">
      <ComboboxTrigger className="w-64">
        <ComboboxValue placeholder="Select a product" />
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxInput showTrigger={false} placeholder="Search" />
        <ComboboxEmpty>No results found.</ComboboxEmpty>
        <ComboboxList>
          <ComboboxGroup>
            <ComboboxLabel>Frameworks</ComboboxLabel>
            <ComboboxItem value="next">Next.js</ComboboxItem>
            <ComboboxItem value="nuxt">Nuxt</ComboboxItem>
            <ComboboxItem value="remix">Remix</ComboboxItem>
          </ComboboxGroup>
          <ComboboxSeparator />
          <ComboboxGroup>
            <ComboboxLabel>Platforms</ComboboxLabel>
            <ComboboxItem value="vercel">Vercel</ComboboxItem>
            <ComboboxItem value="netlify">Netlify</ComboboxItem>
            <ComboboxItem value="cloudflare">Cloudflare</ComboboxItem>
          </ComboboxGroup>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

const users = [
  {
    id: "",
    value: "",
    name: "Select user",
    avatar: "https://github.com/shadcn.png",
  },
  {
    id: "1",
    value: "john-doe",
    name: "John Doe",
    avatar: "https://github.com/shadcn.png",
  },
  {
    id: "2",
    value: "jane-smith",
    name: "Jane Smith",
    avatar: "https://github.com/shadcn.png",
  },
  {
    id: "3",
    value: "alex-johnson",
    name: "Alex Johnson",
    avatar: "https://github.com/shadcn.png",
  },
  {
    id: "4",
    value: "sam-wilson",
    name: "Sam Wilson",
    avatar: "https://github.com/shadcn.png",
  },
];

export function ComboboxWithAvatarDemo() {
  return (
    <Combobox items={users}>
      <ComboboxTrigger className="w-64">
        <ComboboxValue placeholder="Select a user">
          {(item) => (
            <div className="flex items-center gap-2">
              <Avatar size="xs">
                <AvatarImage src={item?.avatar || "https://github.com/shadcn.png"} alt={item?.name || "John Doe"} />
                <AvatarFallback>
                  {item?.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span>{item?.name || "John Doe"}</span>
            </div>
          )}
        </ComboboxValue>
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxInput showTrigger={false} placeholder="Search users" />
        <ComboboxEmpty>No users found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item.id} value={item}>
              <Avatar size="xs">
                <AvatarImage src={item?.avatar || "https://github.com/shadcn.png"} alt={item?.name || "John Doe"} />
                <AvatarFallback>
                  {item?.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span>{item?.name || "John Doe"}</span>
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
