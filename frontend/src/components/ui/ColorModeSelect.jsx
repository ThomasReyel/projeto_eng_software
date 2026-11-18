import { useState } from "react";
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import { DarkMode, LightMode, SettingsBrightness } from "@mui/icons-material";
import HeaderIconButton from "./HeaderIconButton";

const opcoesTema = [
    {
        valor: "system",
        texto: "Sistema",
        icone: <SettingsBrightness fontSize="small" />,
    },
    { valor: "light", texto: "Claro", icone: <LightMode fontSize="small" /> },
    { valor: "dark", texto: "Escuro", icone: <DarkMode fontSize="small" /> },
];

function ColorModeSelect() {
    const { mode, setMode } = useColorScheme();
    const [anchorEl, setAnchorEl] = useState(null);

    if (!mode) {
        return null;
    }

    const opcaoAtual =
        opcoesTema.find((opcao) => opcao.valor === mode) || opcoesTema[0];

    const handleSelect = (novoModo) => {
        setMode(novoModo);
        setAnchorEl(null);
    };

    return (
        <>
            <HeaderIconButton
                title="Alterar tema"
                onClick={(e) => setAnchorEl(e.currentTarget)}
            >
                {opcaoAtual.icone}
            </HeaderIconButton>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >
                {opcoesTema.map((opcao) => (
                    <MenuItem
                        key={opcao.valor}
                        selected={mode === opcao.valor}
                        onClick={() => handleSelect(opcao.valor)}
                    >
                        <ListItemIcon>{opcao.icone}</ListItemIcon>
                        <ListItemText>{opcao.texto}</ListItemText>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}

export default ColorModeSelect;
