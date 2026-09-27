import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import Card from "@mui/material/Card"
import { Link } from "react-router-dom"
import Typography from "@mui/material/Typography"

function HomePage(){
    return(
        <Container sx={{ py: 8 }}>
            <Card sx={{ p: 5 }}>

                <Typography
                    variant="h3"
                    sx={{
                        mb: 2,
                        fontSize: {
                            xs: "2.2rem",
                            sm: "3rem"
                        }}}
                >
                    Классификатор комментариев
                </Typography>

                <Typography
                    variant="h6"
                    sx={{ mb: 4 }}
                >
                    Анализируйте комментарии и определяйте их
                    тональность: положительную или отрицательную.
                </Typography>

                <Button
                    component={Link}
                    to="/login"
                    variant="contained"
                    size="large"
                >
                    Начать работу
                </Button>

            </Card>
        </Container>
    )
}

export default HomePage