<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture rules
- Keep illustrative rule records in a browser-safe data module and label them as samples; no live legal retrieval or address verification is implied.
- Use existing shadcn buttons, calendar/popover, and Radix dialog primitives for interactive controls to preserve keyboard and focus behavior.
- Keep semantic colors, borders, and shadow styles in the global stylesheet; surfaces stay flat with hairline borders and soft diffuse shadows rather than hard-offset or pressed-in effects.
