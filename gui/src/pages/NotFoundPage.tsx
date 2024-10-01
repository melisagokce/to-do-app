import React from "react";
import { Button, Result } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const App: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle={t("components.notFoundPage.text", {
        defaultValue: "Üzgünüz, ziyaret ettiğiniz sayfa mevcut değil.",
      })}
      extra={
        <Button type="primary" onClick={() => navigate("/liste")}>
          {t("components.notFoundPage.button", { defaultValue: "Geri Dön" })}
        </Button>
      }
    />
  );
};

export default App;
