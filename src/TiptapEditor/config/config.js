import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import { InlineMath } from "../extentions/InlineMath";
import Focus from "@tiptap/extension-focus";
import { BlockMath } from "../extentions/BlockMath";
// import { inlineMath } from "../extentions/math/inlineMath";
export const Extensions = [
    StarterKit.configure({
        heading: {
            addGlobalAttributes() {
                return [
                    {
                        types: [
                            'heading',
                        ],
                        attributes: {
                            id: {
                                default: null,
                            },
                        },
                    },
                ];
            }
        }
    }),
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
    Table.configure({
        resizable: true
    }),
    TableRow,
    TableHeader,
    TableCell,
    // inlineMath,
    InlineMath,
    BlockMath,
    Focus.configure({
        className: 'focused',
        mode: 'all'
    })
];