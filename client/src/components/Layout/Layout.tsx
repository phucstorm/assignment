import { Box, Stack, Typography } from "@mui/material"
import React from "react"

export interface LayoutProps {
    children: React.ReactNode
    title?: string
    pageAction?: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children , title, pageAction }) => {
    const renderPageTitle = () => {
        if(!title){
            return null
        }
        return <Typography variant="h4" noWrap>{title}</Typography>
    }

    return (
        <Box>
            <Stack spacing={2} direction={'row'} alignItems={'center'} justifyContent={'space-between'} marginBottom={1}>
                {renderPageTitle()}
                {pageAction}
            </Stack>
            {children}
        </Box>
    )
}

export default Layout