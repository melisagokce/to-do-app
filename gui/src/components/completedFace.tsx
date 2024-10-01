/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { Image } from "antd";
import { useTranslation } from "react-i18next";

const completedFace = ({ source }: { source: string }) => {
  const { t } = useTranslation();
  return (
    <div
      style={{
        position: "absolute",
        width: "calc(100% + 2px)",
        height: "calc(100% + 2px)",
        marginTop: "0px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderBottomLeftRadius: "12px",
        borderBottomRightRadius: "12px",
        zIndex: "9998",
        background: "rgba(35,35,35,0.6)",
        backdropFilter: "blur(1.5px)",
        left: "0px",
        top: "0px",
      }}
    >
      <Image src={source} width={64} preview={false} />
      <span style={{ color: "#65E965" }}>
        {t("components.completedFace.text", { defaultValue: "Tamamlandı" })}
      </span>
    </div>
  );
};

export default completedFace;
