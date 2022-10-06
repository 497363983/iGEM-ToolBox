import { withMermaid } from "vitepress-plugin-mermaid";

/**
 * @type {import('vitepress').UserConfig}
 */

export default withMermaid({
    title: 'iGEM-ToolBox',
    description: 'A tool to help edit wiki in iGEM.',
    lastUpdated: true,
    themeConfig: {
        logo: '/igem_toolbox.svg',
        nav: [
            {
                text: 'Guide',
                link: '/guide/introduction/what-is-iGEM-ToolBox'
            }
        ],
        sidebar: {
            '/guide/': [
                {
                    text: 'Introduction',
                    collapsible: true,
                    items: [
                        {
                            text: 'What is iGEM-ToolBox',
                            link: '/guide/introduction/what-is-iGEM-ToolBox'
                        },
                        {
                            text: 'Getting started',
                            link: '/guide/introduction/'
                        }
                    ]
                }
            ]
        },
        socialLinks: [
            {
                icon: 'github',
                link: 'https://github.com/497363983/iGEM-ToolBox'
            }
        ]
    },
    markdown: {
        config: (md) => {
            // md.use(require('@wekanteam/markdown-it-mermaid'))
            md.use(require('markdown-it-texmath'), {
                engine: require('katex'),
                delimiters: 'gitlab',
            })
        }
    }
})