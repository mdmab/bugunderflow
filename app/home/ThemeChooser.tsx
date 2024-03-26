import { DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { DropdownMenu, DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import { redirect } from 'next/dist/server/api-utils'
import Image from 'next/image'
import React, { useState } from 'react'

const ThemeChooser = () => {
  const [lightIconPath, setLightIconPath] = useState("/assets/icons/sun.svg")
  const [darkIconPath, setDarkIconPath] = useState("/assets/icons/moon.svg")
  const [theme, setTheme] = useState("Light")

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className='border-none hover:border-none'>
          <Image height={30} width={30} alt="theme-logo"
                 src={theme === "Light" ? lightIconPath: darkIconPath}
                 className='border-none hover:border-none'
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            Theme
          </DropdownMenuLabel>
          <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
            <DropdownMenuRadioItem value="Light"> Light </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="Dark"> Dark </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default ThemeChooser
