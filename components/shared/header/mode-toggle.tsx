'use client'
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuContent, DropdownMenuCheckboxItem } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { SunIcon, MoonIcon, SunMoonIcon } from "lucide-react";

const ModeToggle = () => {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }



    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant='ghost' className="focus-visible:ring-0 foucs-visible:ring-offset-0">
                {theme === 'system' ? (<SunMoonIcon />) : theme === 'dark' ? (<MoonIcon />) : (<SunIcon />)}
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>Appearance </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked={theme === 'system'} onClick={() => setTheme('system')}>
                System
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={theme === 'dark'} onClick={() => setTheme('dark')}>
                Dark
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={theme === 'light'} onClick={() => setTheme('light')}>
                Light
            </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
    </DropdownMenu>;
}

export default ModeToggle; 