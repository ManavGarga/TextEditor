"use client";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";

// types
import { type ColorResult, SketchPicker } from "react-color";
import { type Level } from "@tiptap/extension-heading";

// icons
import {
  BoldIcon,
  ItalicIcon,
  ListTodoIcon,
  LucideIcon,
  MessageSquarePlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon,
  ChevronDownIcon,
  HighlighterIcon,
  Link2Icon,
  ImageIcon,
  UploadIcon,
  SearchIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  AlignJustifyIcon,
  ListIcon,
  ListOrderedIcon,
  MinusIcon,
  PlusIcon,
  ListCollapseIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const LineHeightButton = () => {
  const { editor } = useEditorStore();

  const lineHeights = [
    { label: "Default", value: "normal" },
    { label: "Single", value: "1" },
    { label: "1.15", value: "1.15" },
    { label: "1.5", value: "1.5" },
    { label: "Double", value: "2" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-10 min-w-10 shrink-0 flex flex-col items-center justify-center rounded-xl hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 hover:shadow-md px-2.5 overflow-hidden text-sm transition-all duration-200 group">
          <ListCollapseIcon className="size-5 group-hover:scale-110 transition-transform" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2 flex flex-col gap-y-1 bg-white/95 backdrop-blur-lg border-purple-100 shadow-xl rounded-xl">
        {lineHeights.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => editor?.chain().focus().setLineHeight(value).run()}
            className={cn(
              "flex items-center gap-x-2 px-4 py-2.5 rounded-lg hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 hover:shadow-sm transition-all duration-200",
              editor?.getAttributes("paragraph").lineHeight === value && "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
            )}
          >
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const FontSizeButton = () => {
  const { editor } = useEditorStore();

  const currentFontSize = editor?.getAttributes("textStyle").fontSize
    ? editor?.getAttributes("textStyle").fontSize.replace("px", "")
    : "16";

  const [fontSize, setFontSize] = useState(currentFontSize);
  const [inputValue, setInputValue] = useState(fontSize);
  const [isEditing, setIsEditing] = useState(false);

  const updateFontSize = (newSize: string) => {
    const size = parseInt(newSize);
    if (!isNaN(size) && size > 0) {
      editor?.chain().focus().setFontSize(`${size}px`).run();
      setFontSize(newSize);
      setInputValue(newSize);
      setIsEditing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    updateFontSize(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      updateFontSize(inputValue);
      editor?.commands.focus();
    }
  };

  const increment = () => {
    const newSize = parseInt(fontSize) + 1;
    updateFontSize(newSize.toString());
  };

  const decrement = () => {
    const newSize = parseInt(fontSize) - 1;
    if (newSize > 0) {
      updateFontSize(newSize.toString());
    }
  };

  return (
    <div className="flex items-center gap-x-1 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-1 shadow-inner">
      <button
        onClick={decrement}
        className="h-9 w-9 shrink-0 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-md transition-all duration-200"
      >
        <MinusIcon className="size-4" />
      </button>
      {isEditing ? (
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          className="h-9 w-14 text-sm font-semibold text-center border-2 border-purple-400 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm"
        />
      ) : (
        <button
          onClick={() => {
            setIsEditing(true);
            setFontSize(currentFontSize);
          }}
          className="h-9 w-14 text-sm font-semibold text-center bg-white rounded-lg hover:shadow-md transition-all duration-200 cursor-text"
        >
          {currentFontSize}
        </button>
      )}
      <button
        onClick={increment}
        className="h-9 w-9 shrink-0 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-md transition-all duration-200"
      >
        <PlusIcon className="size-4" />
      </button>
    </div>
  );
};

const ListButton = () => {
  const { editor } = useEditorStore();

  const lists = [
    {
      label: "Bullet List",
      icon: ListIcon,
      isActive: () => editor?.isActive("bulletList"),
      onClick: () => editor?.chain().focus().toggleBulletList().run(),
    },
    {
      label: "Ordered List",
      icon: ListOrderedIcon,
      isActive: () => editor?.isActive("orderedList"),
      onClick: () => editor?.chain().focus().toggleOrderedList().run(),
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-10 min-w-10 shrink-0 flex flex-col items-center justify-center rounded-xl hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 hover:shadow-md px-2.5 overflow-hidden text-sm transition-all duration-200 group">
          <ListIcon className="size-5 group-hover:scale-110 transition-transform" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2 flex flex-col gap-y-1 bg-white/95 backdrop-blur-lg border-purple-100 shadow-xl rounded-xl">
        {lists.map(({ label, icon: Icon, onClick, isActive }) => (
          <button
            key={label}
            onClick={onClick}
            className={cn(
              "flex items-center gap-x-3 px-4 py-2.5 rounded-lg hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 hover:shadow-sm transition-all duration-200",
              isActive() && "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
            )}
          >
            <Icon className="size-5" />
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const AlignButton = () => {
  const { editor } = useEditorStore();

  const alignments = [
    {
      label: "Align Left",
      value: "left",
      icon: AlignLeftIcon,
    },
    {
      label: "Align Center",
      value: "center",
      icon: AlignCenterIcon,
    },
    {
      label: "Align Right",
      value: "right",
      icon: AlignRightIcon,
    },
    {
      label: "Align Justify",
      value: "justify",
      icon: AlignJustifyIcon,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-10 min-w-10 shrink-0 flex flex-col items-center justify-center rounded-xl hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 hover:shadow-md px-2.5 overflow-hidden text-sm transition-all duration-200 group">
          <AlignLeftIcon className="size-5 group-hover:scale-110 transition-transform" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2 flex flex-col gap-y-1 bg-white/95 backdrop-blur-lg border-purple-100 shadow-xl rounded-xl">
        {alignments.map(({ label, value, icon: Icon }) => (
          <button
            key={value}
            onClick={() => editor?.chain().focus().setTextAlign(value).run()}
            className={cn(
              "flex items-center gap-x-3 px-4 py-2.5 rounded-lg hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 hover:shadow-sm transition-all duration-200",
              editor?.isActive({ textAlign: value }) && "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
            )}
          >
            <Icon className="size-5" />
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ImageButton = () => {
  const { editor } = useEditorStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  console.log(editor?.getAttributes("link").href, "TEST");

  const onChange = (src: string) => {
    editor?.chain().focus().setImage({ src }).run();
  };

  const onUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];

      if (file) {
        const imageUrl = URL.createObjectURL(file);
        onChange(imageUrl);
      }
    };

    input.click();
  };

  const handleImageUrlSubmit = () => {
    if (imageUrl) {
      onChange(imageUrl);
      setImageUrl("");
      setIsDialogOpen(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="h-10 min-w-10 shrink-0 flex items-center justify-center rounded-xl hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 hover:shadow-md px-2.5 overflow-hidden text-sm transition-all duration-200 group">
            <ImageIcon className="size-5 group-hover:scale-110 transition-transform" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-2.5 flex flex-col gap-x-2">
          <DropdownMenuItem onClick={onUpload} className="cursor-pointer">
            <UploadIcon className="size-4 mr-2" />
            Upload
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDialogOpen(true)} className="cursor-pointer">
            <SearchIcon className="size-4 mr-2" />
            Paste image url
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert image URL</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Insert image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleImageUrlSubmit();
              }
            }}
          />
          <DialogFooter>
            <Button onClick={handleImageUrlSubmit}>Insert</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

const LinkButton = () => {
  const { editor } = useEditorStore();
  const [value, setValue] = useState("");

  console.log(editor?.getAttributes("link").href, "TEST");

  const onChange = (href: string) => {
    editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
    setValue("");
  };

  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (open) {
          setValue(editor?.getAttributes("link").href || "");
        }
      }}
    >
      <DropdownMenuTrigger onClick={() => setValue(editor?.getAttributes("link").href)} asChild>
        <button className="h-10 min-w-10 shrink-0 flex flex-col items-center justify-center rounded-xl hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 hover:shadow-md px-2.5 overflow-hidden text-sm transition-all duration-200 group">
          <Link2Icon className="size-5 group-hover:scale-110 transition-transform" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5 flex items-center gap-x-2">
        <Input
          placeholder="https://www.example.com"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button onClick={() => onChange(value)}>Apply</Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const HighlightColorButton = () => {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes("highlight").color || "#FFFFFFFF";

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setHighlight({ color: color.hex }).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-10 min-w-10 shrink-0 flex flex-col items-center justify-center rounded-xl hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 hover:shadow-md px-2.5 overflow-hidden text-sm transition-all duration-200 group">
          <HighlighterIcon className="size-5 group-hover:scale-110 transition-transform" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0 border-0 shadow-2xl rounded-2xl overflow-hidden">
        <SketchPicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const TextColorButton = () => {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes("textStyle").color || "#000000";

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-10 min-w-10 shrink-0 flex flex-col items-center justify-center rounded-xl hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 hover:shadow-md px-2.5 overflow-hidden text-sm transition-all duration-200 group">
          <span className="text-base font-bold group-hover:scale-110 transition-transform">A</span>
          <div className="h-1 w-5 rounded-full mt-0.5" style={{ backgroundColor: value }}></div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0 border-0 shadow-2xl rounded-2xl overflow-hidden">
        <SketchPicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const HeadingLevelButton = () => {
  const { editor } = useEditorStore();

  const headings = [
    { label: "Normal text", value: 0, fontSize: "16px" },
    { label: "Heding 1", value: 1, fontSize: "32px" },
    { label: "Heding 2", value: 2, fontSize: "24px" },
    { label: "Heding 3", value: 3, fontSize: "20px" },
    { label: "Heding 4", value: 4, fontSize: "18px" },
    { label: "Heding 5", value: 5, fontSize: "16px" },
  ];

  const getCurrentHeading = () => {
    for (let level = 1; level <= 5; level++) {
      if (editor?.isActive("heading", { level })) {
        return `Heading ${level}`;
      }
    }

    return "Normal text";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-10 min-w-10 shrink-0 flex items-center justify-center rounded-xl hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 hover:shadow-md px-3 overflow-hidden text-sm transition-all duration-200 group">
          <span className="truncate font-medium">{getCurrentHeading()}</span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0 group-hover:rotate-180 transition-transform duration-200" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2 flex flex-col gap-y-1 bg-white/95 backdrop-blur-lg border-purple-100 shadow-xl rounded-xl">
        {headings.map(({ label, value, fontSize }) => (
          <button
            key={value}
            style={{ fontSize }}
            className={cn(
              "flex items-center gap-x-2 px-4 py-2.5 font-[value] rounded-lg hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 hover:shadow-sm transition-all duration-200",
              (value === 0 && !editor?.isActive("heading")) ||
                (editor?.isActive("heading", { level: value as Level }) && "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md")
            )}
            onClick={() => {
              if (value === 0) {
                editor?.chain().focus().setParagraph().run();
              } else {
                editor
                  ?.chain()
                  .focus()
                  .toggleHeading({ level: value as Level })
                  .run();
              }
            }}
          >
            {label}
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const FontFamilyButton = () => {
  const { editor } = useEditorStore();

  const fonts = [
    { label: "Arial", value: "Arial" },
    { label: "Times New Roman", value: "Times New Roman" },
    { label: "Courier New", value: "Courier New" },
    { label: "Georgia", value: "Georgia" },
    { label: "Verdana", value: "Verdana" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-10 w-[140px] shrink-0 flex items-center justify-between rounded-xl hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 hover:shadow-md px-3 overflow-hidden text-sm transition-all duration-200 group">
          <span className="truncate font-medium">
            {editor?.getAttributes("textStyle").fontFamily || "Arial"}
          </span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0 group-hover:rotate-180 transition-transform duration-200" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2 flex flex-col gap-y-1 bg-white/95 backdrop-blur-lg border-purple-100 shadow-xl rounded-xl">
        {fonts.map(({ label, value }) => (
          <button
            onClick={() => editor?.chain().focus().setFontFamily(value).run()}
            key={value}
            className={cn(
              "flex items-center gap-x-2 px-4 py-2.5 font-[value] rounded-lg hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 hover:shadow-sm transition-all duration-200",
              editor?.getAttributes("textStyle").fontFamily === value && "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
            )}
            style={{ fontFamily: value }}
          >
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface ToolbarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}

const ToolbarButton = ({ onClick, isActive, icon: Icon }: ToolbarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-sm h-10 min-w-10 flex items-center justify-center rounded-xl hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 hover:shadow-md transition-all duration-200 group",
        isActive && "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105"
      )}
    >
      <Icon className={cn("size-5", !isActive && "group-hover:scale-110 transition-transform")} />
    </button>
  );
};

export const Toolbar = () => {
  const { editor } = useEditorStore();

  const sections: { label: string; icon: LucideIcon; onClick: () => void; isActive?: boolean }[][] =
    [
      [
        {
          label: "Undo",
          icon: Undo2Icon,
          onClick: () => editor?.chain().focus().undo().run(),
        },
        {
          label: "Redo",
          icon: Redo2Icon,
          onClick: () => editor?.chain().focus().redo().run(),
        },
        {
          label: "Print",
          icon: PrinterIcon,
          onClick: () => window.print(),
        },
        {
          label: "Spell Check",
          icon: SpellCheckIcon,
          onClick: () => {
            const current = editor?.view.dom.getAttribute("spellcheck");
            editor?.view.dom.setAttribute("spellcheck", current === "false" ? "true" : "false");
          },
        },
      ],
      [
        {
          label: "Bold",
          icon: BoldIcon,
          isActive: editor?.isActive("bold"),
          onClick: () => editor?.chain().focus().toggleBold().run(),
        },
        {
          label: "Italic",
          icon: ItalicIcon,
          isActive: editor?.isActive("italic"),
          onClick: () => editor?.chain().focus().toggleItalic().run(),
        },
        {
          label: "Underline",
          icon: UnderlineIcon,
          isActive: editor?.isActive("underline"),
          onClick: () => editor?.chain().focus().toggleUnderline().run(),
        },
      ],
      [
        {
          label: "Comment",
          icon: MessageSquarePlusIcon,
          onClick: () => editor?.chain().focus().addPendingComment().run(),
          isActive: editor?.isActive("liveblocksCommentMark"), 
        },
        {
          label: "List Todo",
          icon: ListTodoIcon,
          onClick: () => editor?.chain().focus().toggleTaskList().run(),
          isActive: editor?.isActive("taskList"),
        },
        {
          label: "Remove Formatting",
          icon: RemoveFormattingIcon,
          onClick: () => editor?.chain().focus().unsetAllMarks().run(),
          isActive: editor?.isActive("taskList"),
        },
      ],
    ];

  return (
    <div className="bg-gradient-to-r from-white via-purple-50/30 to-white shadow-lg px-5 py-2.5 rounded-3xl min-h-[56px] flex items-center gap-x-2 overflow-x-auto border-2 border-purple-100/50 backdrop-blur-sm">
      {sections[0].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <div className="h-8 w-px bg-gradient-to-b from-transparent via-purple-200 to-transparent mx-1" />
      <FontFamilyButton />
      <div className="h-8 w-px bg-gradient-to-b from-transparent via-purple-200 to-transparent mx-1" />
      <HeadingLevelButton />
      <div className="h-8 w-px bg-gradient-to-b from-transparent via-purple-200 to-transparent mx-1" />
      <FontSizeButton />
      <div className="h-8 w-px bg-gradient-to-b from-transparent via-purple-200 to-transparent mx-1" />
      {sections[1].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <TextColorButton />
      <HighlightColorButton />
      <div className="h-8 w-px bg-gradient-to-b from-transparent via-purple-200 to-transparent mx-1" />
      <LinkButton />
      <ImageButton />
      <AlignButton />
      <LineHeightButton />
      <ListButton />
      {sections[2].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
    </div>
  );
};