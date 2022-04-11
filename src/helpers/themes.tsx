const allThemes : string[] = ['light', 'dark']
const allProperties : string[] = ['backgroundcolor', 'sidebarbackgroundcolor',
'textcolor', 'datatablebackground']
const themeKey = 'theme'
let currentTheme = 0

const setTheme = (theme: string) =>{
    for(let property of allProperties){
        document.documentElement.style.setProperty(`--${property}`, `var(--${theme}-${property})`);
    }
    localStorage.setItem(themeKey, theme)
}

const nextThemeIndex = () =>{
    currentTheme++
    return currentTheme % allThemes.length
}

export const setCurrentTheme = () =>{
    const theme = localStorage.getItem(themeKey)
    if(theme == null){
        localStorage.setItem(themeKey, allThemes[0])
        setTheme(allThemes[0])
        return allThemes[0]
    }else{
        setTheme(theme)
        currentTheme = allThemes.indexOf(theme)
        return theme
    }
}

export const setNextTheme = () =>{
    setTheme(allThemes[nextThemeIndex()])
}