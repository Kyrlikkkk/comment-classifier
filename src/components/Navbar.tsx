import { AppBar, Toolbar, Button, Typography } from "@mui/material"
import { Link } from "react-router-dom"

function Navbar() {
    return (
        <AppBar position="static">
            <Toolbar sx={{
                        flexWrap: "wrap",
                        justifyContent: "center",
                        py: 1
                    }}>
                <Typography
                    variant="h6"
                    sx={{
                        flexGrow: 1,
                        textAlign: {
                            xs: "center",
                            sm: "left"
                        },
                        width: {
                            xs: "100%",
                            sm: "auto"
                        },
                        mb: {
                            xs: 1,
                            sm: 0
                        }
                    }}
                >
                    Comment Classifier
                </Typography>

                <Button
                    color="inherit"
                    component={Link}
                    to="/"
                >
                    Главная
                </Button>

                <Button
                    color="inherit"
                    component={Link}
                    to="/classifier"
                >
                    Классификатор
                </Button>

                <Button
                    color="inherit"
                    component={Link}
                    to="/profile"
                >
                    Профиль
                </Button>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar