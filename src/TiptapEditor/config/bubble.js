import { editor } from "../index";
import { ref } from "vue";

const order = ["First", "Second", "Third", "Forth", "Fifth", "Sixth"];
export const LinkMenu = ref(false);
export const inputLink = ref("");
function toggleLink() {
    editor.chain().focus().run();
    const link = editor.getAttributes("link").href;
    inputLink.value = link || "";
    LinkMenu.value = !LinkMenu.value;
    console.log(LinkMenu.value);
}
export const bubble = [
    {
        role: "dropItem",
        icon: "h",
        title: "heading",
        isActive: () => editor.isActive("heading"),
        children: Array.from({ length: 6 }, (item, index) => ({
            role: "item",
            icon: `h${index + 1}`,
            title: `${order[index]}-level heading`,
            action: () =>
                editor
                    .chain()
                    .focus()
                    .toggleHeading({ level: index + 1 })
                    .run(),
            isActive: () => editor.isActive("heading", { level: index + 1 }),
        })),
    },
    {
        role: "item",
        icon: "ul",
        title: "BulletList",
        action: () => editor.chain().focus().toggleBulletList().run(),
        isActive: () => editor.isActive("bulletList"),
    },
    {
        role: "item",
        icon: "ol",
        title: "OrderedList",
        action: () => editor.chain().focus().toggleOrderedList().run(),
        isActive: () => editor.isActive("orderedList"),
    },
    {
        role: "item",
        icon: "bold",
        title: "Bold",
        action: () => editor.chain().focus().toggleBold().run(),
        isActive: () => editor.isActive("bold"),
    },
    {
        role: "item",
        icon: "italic",
        title: "Italic",
        action: () => editor.chain().focus().toggleItalic().run(),
        isActive: () => editor.isActive("italic"),
    },
    {
        role: "item",
        icon: "strike",
        title: "Strike",
        action: () => editor.chain().focus().toggleStrike().run(),
        isActive: () => editor.isActive("strike"),
    },
    {
        role: "item",
        icon: "blockquote_left",
        title: "Blockquote",
        action: () => editor.chain().focus().toggleBlockquote().run(),
        isActive: () => editor.isActive("blockquote"),
    },
    {
        role: "item",
        icon: "link",
        title: "Link",
        action: toggleLink(),
        isActive: () => editor.isActive("link") || LinkMenu.value,
    },
    {
        role: "item",
        icon: "reference",
        title: "Reference",
        action: toggleLink(),
        isActive: () => editor.isActive("link") || LinkMenu.value,
    },
    {
        role: "dropItem",
        icon: "more",
        title: "More",
        children: [
            {
                role: "item",
                icon: "justify_left",
                title: "Align left",
                action: () => editor.chain().focus().setTextAlign("left").run(),
                isActive: () => editor.isActive({ textAlign: "left" }),
            },
            {
                role: "item",
                icon: "text_center",
                title: "Align center",
                action: () => editor.chain().focus().setTextAlign("center").run(),
                isActive: () => editor.isActive({ textAlign: "center" }),
            },
            {
                role: "item",
                icon: "justify_right",
                title: "Align right",
                action: () => editor.chain().focus().setTextAlign("right").run(),
                isActive: () => editor.isActive({ textAlign: "right" }),
            },
            {
                role: "item",
                icon: "justify",
                title: "Align justify",
                action: () => editor.chain().focus().setTextAlign("justify").run(),
                isActive: () => editor.isActive({ textAlign: "justify" }),
            },
            {
                role: "item",
                icon: "highlight",
                title: "High light",
                action: () => editor.chain().focus().toggleHighlight().run(),
                isActive: () => editor.isActive("highlight"),
            },
        ],
    },
];