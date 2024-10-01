import React, { useEffect, useState } from 'react'
import { Divider, Layout, Select, Switch } from 'antd';
import { useTranslation } from 'react-i18next';
import ILanguageProps from '../../../../models/language/ILanguageProps';
import { DarkTheme24Regular, Earth24Regular } from '@fluentui/react-icons';
import i18n from '../../../../localization/i18n';
import AppSettingActions from '../../../../store/actions/AppSettingActions';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { makeStyles } from '@mui/styles';
import LocalStorageManager from '../../../../managers/LocalStorageManager';

const customStyles = makeStyles({
    icons:{
        marginRight:"5px"
    }
});

const SwitchLanguage = () => {
    const { t } = useTranslation();
    const [language, setLanguage] = useState<ILanguageProps[] | undefined>();
    const [selectedLanguage, setSelectedLanguage] = useState<string | undefined>("TR");
    const darkMode = useSelector((state: RootState)=> state.appSettingsReducer.darkMode);
    const storeLanguage = useSelector((state: RootState)=> state.appSettingsReducer.language);
    const styles = customStyles();
    useEffect(()=>{
        setSelectedLanguage("TR")
    },[])

    useEffect(()=>{
        setSelectedLanguage(storeLanguage.toUpperCase());
    },[storeLanguage])

    useEffect(() => {
        setLanguage([
            {
                text: t("SwitchLanguage.tr", { defaultValue: "Türkçe" }),
                value: "TR"
            },
            {
                text: t("SwitchLanguage.en", { defaultValue: "English"}),
                value: "EN"
            },
            {
                text: t("SwitchLanguage.ru", { defaultValue: "Rusça" }),
                value: "RU"
            },
        ])
    }, [t]);

    const handleChange = (value: string) => {
        setSelectedLanguage(value)
        LocalStorageManager.setLanguage(value);
        i18n.changeLanguage(value.toLowerCase());
    };

    const handleChangeDarkMode = (value: boolean) => {
        AppSettingActions.changeMode(value);
        LocalStorageManager.setDarkMode(value);
    };


    return (
        <Layout style={{position:"relative", display:"flex", flexDirection:"row", maxHeight:"67px"}}>
            <Divider type='vertical' style={{height:"100%"}}/>
            <Layout style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
            <DarkTheme24Regular className={styles.icons}/>
            <Switch value={darkMode} onChange={handleChangeDarkMode}/>
            </Layout>
            <Divider type='vertical' style={{height:"100%"}}/>
            <Layout style={{display:"flex",flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
                <Earth24Regular className={styles.icons}/>
                <Select
                    value={selectedLanguage}
                    style={{ maxWidth:"75px", marginRight:"10px" }}
                    onChange={handleChange}
                    options={language}
                />
            </Layout>
        </Layout>
    )
}

export default SwitchLanguage
