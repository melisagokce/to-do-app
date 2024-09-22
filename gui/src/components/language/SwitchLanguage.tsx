import { Select, Space } from 'antd';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import ILanguageProps from '../../models/language/ILanguageProps';
import { Earth24Regular } from '@fluentui/react-icons';

const SwitchLanguage = () => {
    const { t } = useTranslation();
    const [language, setLanguage] = useState<ILanguageProps[] | undefined>();
    // const [selectedLanguage, setSelectedLanguage] = useState<ILanguageProps | undefined>();

    useEffect(() => {
        setLanguage([
            {
                text: t("SwitchLanguage.tr", { defaultValue: "Türkçe" }),
                value: "TR"
            },
            {
                text: t("SwitchLanguage.en", { defaultValue: "English"}),
                value: "EN"
            }
        ])
    }, [t]);

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };


    return (
        <div>
            <Space wrap style={{display:"flex", alignItems:"center"}}>
                <Earth24Regular/>
                <Select
                    // value={selectedLanguage?.value}
                    style={{ width: 120 }}
                    onChange={handleChange}
                    options={language}
                />
            </Space>
        </div>
    )
}

export default SwitchLanguage
