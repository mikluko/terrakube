import { ErrorInformation } from "@/modules/api/types";
import { Breadcrumb, Typography, Alert, Flex, theme } from "antd";
import Loading from "../../../components/technical/Loading";
import { Content } from "antd/es/layout/layout";
import "./PageWrapper.css";
import { NavLink } from "react-router-dom";
import clsx from "classnames";

type Props = {
  title: string;
  subTitle?: string;
  children: any;
  error?: ErrorInformation;
  loading?: boolean;
  loadingText?: string;
  breadcrumbs?: {
    label: string;
    path: string;
  }[];
  actions?: React.ReactNode;
  fluid?: boolean;
  innerClassName?: string;
  contentClassName?: string;
};

export default function PageWrapper({
  children,
  error,
  loading,
  loadingText,
  title,
  subTitle,
  breadcrumbs,
  actions,
  fluid,
  innerClassName,
  contentClassName,
}: Props) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Content className="page-wrapper">
      {breadcrumbs && (
        <Breadcrumb
          className="page-wrapper-crumbs"
          items={breadcrumbs.map((bc) => ({
            key: bc.path,
            title: <NavLink to={bc.path}>{bc.label}</NavLink>,
          }))}
        />
      )}
      <div className={clsx("page-wrapper-content", contentClassName)} style={{ background: colorBgContainer }}>
        <div
          className={clsx(
            "page-wrapper-inner",
            { "page-wrapper-inner-contained": !fluid },
            {
              "page-wrapper-inner-fluid": fluid,
            },
            innerClassName
          )}
        >
          <Flex justify="space-between" flex={1} wrap>
            <div>
              <Typography.Title className="page-wrapper-title">{title}</Typography.Title>
              {subTitle && <Typography.Text type="secondary">{subTitle}</Typography.Text>}
            </div>
            {actions}
          </Flex>

          {error && (
            <Alert
              className="page-wrapper-alert"
              message={error.title}
              description={error.message}
              type="error"
              showIcon
              banner
            />
          )}

          {loading ? (
            <Flex align="center" className="page-wrapper-loader" vertical gap="middle">
              <Loading label={loadingText || "Loading"} style={{ alignSelf: "stretch" }} />
            </Flex>
          ) : (
            !error && children
          )}
        </div>
      </div>
    </Content>
  );
}
