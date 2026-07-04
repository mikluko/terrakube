import { CSSProperties, ReactNode } from "react";
import "./technical-components.css";

export type TreeNode = {
  label: ReactNode;
  meta?: ReactNode;
  children?: TreeNode[];
};

function Node({ node, isLast, depth }: { node: TreeNode; isLast: boolean; depth: number }) {
  const hasKids = Boolean(node.children && node.children.length > 0);
  return (
    <div className="tk-tree-node">
      {depth > 0 && (
        <div className="tk-tree-connector">
          <div className="tk-tree-connector-v" data-last={isLast || undefined} />
          <div className="tk-tree-connector-h" />
        </div>
      )}
      <div className="tk-tree-content">
        <div className="tk-tree-row">
          <span className="tk-tree-label" data-parent={hasKids || undefined}>
            {node.label}
          </span>
          {node.meta && <span className="tk-tree-meta">{node.meta}</span>}
        </div>
        {hasKids && (
          <div>
            {node.children!.map((c, i) => (
              <Node key={i} node={c} isLast={i === node.children!.length - 1} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/** Hierarchical list drawn with hard right-angle connector lines — filesystem
 *  tree / circuit schematic. For resources, module deps, project → workspace. */
export default function Tree({ nodes = [], style }: { nodes?: TreeNode[]; style?: CSSProperties }) {
  return (
    <div className="tk-tree" style={style}>
      {nodes.map((n, i) => (
        <Node key={i} node={n} isLast={i === nodes.length - 1} depth={0} />
      ))}
    </div>
  );
}
