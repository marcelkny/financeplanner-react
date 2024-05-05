import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import MenuHeading from "../../menues/menu-components/MenuHeading";
import MenuItem from "../../menues/menu-components/MenuItem";

export default function GalleryMenuSection() {
    const navigate = useNavigate();
    const navTo = useCallback(
        (target: string) => {
            navigate(target);
        },
        [navigate]
    );
    return (
        <div className="px-2">
            <div className="mb-4">
                <MenuHeading caption="Bilder verwalten" />
                <MenuItem caption="Bilder hochladen" target="/gallery/upload/multi" onClickFunction={navTo} />

                <div></div>
            </div>
            <div className="mb-4">
                <MenuHeading caption="Tags verwalten" />
                <MenuItem caption="Tag-Liste" />
                <MenuItem caption="Tag-Liste nach Kategorien" />
                <MenuItem caption="Tag-Liste mit Bildern" />
                <MenuItem caption="Tag hinzufügen" />
                <MenuItem caption="Tags zu Bildern hinzufügen" />
                <MenuItem caption="Tag bearbeiten" />
            </div>
            <div className="mb-4">
                <MenuHeading caption="Tag-Kategorien verwalten" />
                <MenuItem caption="Kategorie bearbeiten" />
            </div>
        </div>
    );
}
