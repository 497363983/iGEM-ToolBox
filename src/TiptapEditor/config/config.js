import {
    EditorContent,
    FloatingMenu,
    BubbleMenu
} from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import SideDirectory from "@/components/SideDirectory";
import MenuItem from "@/components/MenuItem";
// import Dropcursor from "@tiptap/extension-dropcursor";
// import ImageExtention from "@/extentions/ImageExtention";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Gapcursor from "@tiptap/extension-gapcursor";
// import Heading from "@tiptap/extension-heading";
import HeadingExtention from "../extentions/HeadingExtention";
// import MathJax from "@/extentions/MathJax";
// import suggestion from "@/components/MathJaxInput/suggestion";
import InlineMath from "../extentions/InlineMath";
import Focus from "@tiptap/extension-focus";
// import StrikeExtention from "../../extentions/StrikeExtention";
// import prosemirrorMath from "@benrbray/prosemirror-math"
import BlockMath from "../extentions/BlockMath";
export const Extentions = [
    StarterKit,
    TextAlign.configure({
        types: ["heading", "paragraph"]
    }),
    Highlight,
    Link.configure({
        autolink: true,
        openOnClick: true,
        linkOnPaste: true
    }),
    Image,
    // ImageExtention,
    Table.configure({
        resizable: true
    }),
    TableRow,
    TableHeader,
    TableCell,
    Gapcursor,
    // Heading,
    HeadingExtention,
    // MathJax.configure({
    //     HTMLAttributes: {
    //         class: "mathjax"
    //     },
    //     suggestion
    // }),
    InlineMath,
    BlockMath,
    // StrikeExtention
    Focus.configure({
        className: 'focused',
        mode: 'all'
    })
];

export const Components = {
    EditorContent,
    FloatingMenu,
    SideDirectory,
    BubbleMenu,
    MenuItem
}