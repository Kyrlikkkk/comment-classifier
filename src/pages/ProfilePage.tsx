import { Button, Card, Container, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Chip } from "@mui/material"
import { useState } from "react"

function ProfilePage() {
    const [showHistory, setShowHistory] = useState(false)
    return (
        <Container sx={{ py: 4 }}>
            <Card sx={{ p: { xs: 2, sm: 4 } }}>
                <Typography variant="h3" sx={{
                            mb: 3,
                            fontSize: {
                                xs: "2rem",
                                sm: "3rem"
                            }
                        }}>
                    👤 Личный кабинет 👤
                </Typography>

                <Typography variant="h5" sx={{
                            fontSize: {
                                xs: "1.3rem",
                                sm: "1.5rem"
                            }
                        }}>
                        Имя пользователя
                </Typography>

                <Typography>
                    user@example.com
                </Typography>

                <Typography variant="h5"  sx={{
                            mt: 3,
                            fontSize: {
                                xs: "1.3rem",
                                sm: "1.5rem"
                            }
                        }}>
                    Последние запросы
                </Typography>

                <Typography>
                    «Отличный товар, мне всё понравилось!»
                </Typography>

                <Typography>
                    Положительный
                </Typography>

                <Typography>
                    «Очень плохое качество товара.»
                </Typography>

                <Typography>
                    Отрицательный
                </Typography>

                <Button
                    variant="contained"
                    onClick={() => setShowHistory(true)}
                >
                    Посмотреть всю историю
                </Button>
                <Dialog
                    open={showHistory}
                    onClose={() => setShowHistory(false)}
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogTitle>
                        История запросов
                    </DialogTitle>

                    <DialogContent dividers>
                        <Card sx={{ mb: 2, p: 2 }}>
                            <Typography variant="body2">
                                27.09.2026
                            </Typography>

                            <Typography sx={{ mt: 1 }}>
                                «Очень хороший товар, мне всё понравилось!»
                            </Typography>

                            <Chip
                                label="Положительный"
                                color="success"
                                sx={{ mt: 2 }}
                            />
                        </Card>

                        <Card sx={{ mb: 2, p: 2 }}>
                            <Typography variant="body2">
                                26.09.2026
                            </Typography>

                            <Typography sx={{ mt: 1 }}>
                                «Качество ужасное, больше покупать не буду.»
                            </Typography>

                            <Chip
                                label="Отрицательный"
                                color="error"
                                sx={{ mt: 2 }}
                            />
                        </Card>

                        <Card sx={{ mb: 2, p: 2 }}>
                            <Typography variant="body2">
                                25.09.2026
                            </Typography>

                            <Typography sx={{ mt: 1 }}>
                                «Всё пришло вовремя, спасибо!»
                            </Typography>

                            <Chip
                                label="Положительный"
                                color="success"
                                sx={{ mt: 2 }}
                            />
                        </Card>

                    </DialogContent>

                    <DialogActions>
                        <Button onClick={() => setShowHistory(false)}>
                            Закрыть
                        </Button>
                    </DialogActions>
                </Dialog>
            </Card>
        </Container>
    )
}

export default ProfilePage