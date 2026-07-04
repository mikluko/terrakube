import StatusBadge from "../../../components/technical/StatusBadge";

type Props = {
  status?: string;
};

// Thin alias over the technical StatusBadge — the one status renderer.
export default function WorkspaceStatusTag({ status }: Props) {
  return <StatusBadge status={status} />;
}
