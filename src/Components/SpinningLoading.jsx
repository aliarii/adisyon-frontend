import { useTranslation } from "react-i18next"

const SpinningLoading = () => {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="border-4 border-solid border-dark-2 border-t-info dark:border-light-2 dark:border-t-info rounded-full w-10 h-10 animate-spin"></div>
            <p>{t("Loading...")}</p>
        </div>
    )
}
export default SpinningLoading
