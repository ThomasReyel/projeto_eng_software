import { Link } from "react-router-dom";
import { AppBar, Box, Stack, Toolbar, Typography } from "@mui/material";
import {
    Menu as MenuIcon,
    MenuOpen as MenuOpenIcon,
} from "@mui/icons-material";
import ColorModeSelect from "../ui/ColorModeSelect";
import HeaderIconButton from "../ui/HeaderIconButton";

function DashboardHeader({ logo, title, menuOpen, onToggleMenu }) {
    return (
        <AppBar
            color="inherit"
            position="fixed"
            sx={{
                borderBottom: 1,
                borderColor: "divider",
                zIndex: (theme) => theme.zIndex.drawer + 1,
                displayPrint: "none",
            }}
        >
            <Toolbar sx={{ mx: { xs: -0.75, sm: -1 } }}>
                <Stack
                    direction="row"
                    sx={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                    }}
                >
                    {/* Esquerda: Botão do menu + Logo + Título */}
                    <Stack
                        direction="row"
                        spacing={1.5}
                        sx={{ alignItems: "center" }}
                    >
                        <HeaderIconButton
                            title={menuOpen ? "Recolher menu" : "Expandir menu"}
                            ariaLabel={
                                menuOpen
                                    ? "Recolher menu de navegação"
                                    : "Expandir menu de navegação"
                            }
                            onClick={() => onToggleMenu(!menuOpen)}
                        >
                            {menuOpen ? (
                                <MenuOpenIcon fontSize="small" />
                            ) : (
                                <MenuIcon fontSize="small" />
                            )}
                        </HeaderIconButton>

                        <Link to="/" style={{ textDecoration: "none" }}>
                            <Stack
                                direction="row"
                                spacing={1}
                                sx={{
                                    alignItems: "center",
                                    color: "text.primary",
                                }}
                            >
                                {logo && (
                                    <Box
                                        sx={{
                                            height: 40,
                                            display: "flex",
                                            alignItems: "center",
                                            "& img": { maxHeight: 40 },
                                        }}
                                    >
                                        {logo}
                                    </Box>
                                )}

                                {title && (
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 700,
                                            whiteSpace: "nowrap",
                                            lineHeight: 1,
                                        }}
                                    >
                                        {title}
                                    </Typography>
                                )}
                            </Stack>
                        </Link>
                    </Stack>

                    {/* Direita: Seletor de tema */}
                    <ColorModeSelect />
                </Stack>
            </Toolbar>
        </AppBar>
    );
}

export default DashboardHeader;
