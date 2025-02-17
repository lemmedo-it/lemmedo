import React from "react";
import { Box, Button, Container, Grid, Stack, Typography } from "../common"
import { Content } from "../constants/content";
import { getNavigationList } from "../constants/parameter"
import { NavigationContext } from "../contexts/navigation";
import { ResponsiveContext } from "../contexts/responsive";
import { Style } from "../styles/style"
import { Squash as Hamburger } from 'hamburger-react'
import { Collapse } from 'react-collapse'
import { OverlayBackground } from "./OverlayBackground";
import styled from "styled-components";

const scrollThreshold = 300;

const MobileNavigationItem = styled.div`
    height: 48px;
    ${Style.Typography.Button1};
    line-height: 48px;
    cursor: pointer;
    color: ${Style.Color.Light100};
    &:hover, &:active {
        color: ${Style.Color.Purple};
    }
`

export const NavigationBar = () => {
    const [scrolled, setScrolled] = React.useState<boolean>(true);
    const { routePath, setNewRoutePath } = React.useContext(NavigationContext);
    const { isDesktop, isMobileOrTablet } = React.useContext(ResponsiveContext);
    const [isMobileOverlayVisible, setIsMobileOverlayVisible] = React.useState<boolean>(false);

    // const handleScroll = () => {
    //     if (window.pageYOffset > scrollThreshold) {
    //         setScrolled(true);
    //     } else {
    //         setScrolled(false);
    //     }
    // };

    // React.useEffect(() => {
    //     handleScroll();
    //     window.addEventListener('scroll', handleScroll);
    //     return () => window.removeEventListener('scroll', handleScroll);
    // })

    const getButtonStyle = (path: string) => {
        const selectedStyle = {
            backgroundColor: Style.Color.Dark100,
            color: Style.Color.Light100,
        }
        const normalStyle = {
            backgroundColor: 'none',
            color: Style.Color.Light75,
        }
        if (routePath === path) return selectedStyle;
        return normalStyle;
    }

    const handleToggleMobileOverlay = () => {
        setIsMobileOverlayVisible(!isMobileOverlayVisible)
    }

    const renderDesktopMenu = () => {
        return (isDesktop &&
            <Grid inline gap={Style.Spacing.M}>
                {getNavigationList().map(({ name, path }, index) =>
                    <Button
                        key={`nav-${index}`}
                        small
                        noFilled
                        {...getButtonStyle(path)}
                        onClick={() => setNewRoutePath && setNewRoutePath(path)}
                    >
                        {name}
                    </Button>
                )}
            </Grid>
        )
    }

    const renderMobileMenu = () => {
        return (isMobileOrTablet &&
            <Box marginRight={-15} maxWidth={scrolled ? '500px' : '0'} transform={scrolled ? 'scale(1)' : 'scale(0)'} overflow="hidden" transition="1s ease">
                <Hamburger toggled={isMobileOverlayVisible} toggle={handleToggleMobileOverlay} color={Style.Color.Light100} rounded size={18} />
            </Box>
        )
    }

    const handleMobileSetRoute = (path: string) => {
        if(setNewRoutePath) {
            setIsMobileOverlayVisible(false)
            setNewRoutePath(path)
        }
    }

    const renderMobileOverlay = () => {
        return (
            isMobileOrTablet && (
                <Collapse isOpened={isMobileOverlayVisible}>
                    <Container>
                        <Box marginBottom={Style.Spacing.XXL} marginTop={Style.Spacing.L} textAlign="center">
                            <Stack vertical gap={Style.Spacing.XS}>
                                {getNavigationList().map(({ name, path }, index) =>
                                    <MobileNavigationItem key={`mob-nav-${index}`} onClick={() => handleMobileSetRoute(path)}>{name}</MobileNavigationItem>
                                )}
                            </Stack>
                        </Box>
                    </Container>
                </Collapse>
            )
        )
    }

    const barMargin = isDesktop ? '28px 0' : '12px 0';
    // const visibleBackgroundColor = isMobileOverlayVisible ? Style.Color.Dark50 : Style.Color.Dark75;
    const visibleBackgroundColor = 'transparent';
    const backgroundColor = (isMobileOrTablet && !scrolled) ? 'transparent' : visibleBackgroundColor;

    return (
        <React.Fragment>
            {/* {isMobileOrTablet && <OverlayBackground isOpened={isMobileOverlayVisible} onClick={() => isMobileOverlayVisible && setIsMobileOverlayVisible(false)} />} */}
            {/* <Container> */}
                <Box margin={barMargin} display="flex" alignItems="center">
                    <Box maxWidth={scrolled ? '500px' : '0'} transform={scrolled ? 'scale(1)' : 'scale(0)'} overflow="hidden" transition="0.5s ease">
                        {/* <Typography variant="heading2" animatedGradient noWrap>{Content.Name}</Typography> */}
                        {/* <Box height="2rem"> */}
                            {/* <LemmedoLogoSrc /> */}
                            <svg width="fit-content" height="1.5rem" viewBox="0 0 294 43" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.79282 42.5938C6.5851 42.5938 4.83415 42.156 3.53996 41.2806C2.28385 40.367 1.37031 39.1109 0.799347 37.5122C0.266449 35.8754 0 33.9913 0 31.8597V2.16966H9.82055V32.2023C9.82055 33.1539 9.99184 33.82 10.3344 34.2006C10.7151 34.5432 11.0767 34.7145 11.4192 34.7145C11.6096 34.7145 11.7618 34.7145 11.876 34.7145C12.0283 34.6764 12.2186 34.6384 12.447 34.6003L13.5889 41.7944C13.0941 42.0228 12.447 42.2131 11.6476 42.3654C10.8483 42.5176 9.89667 42.5938 8.79282 42.5938Z" fill="black"/>
<path d="M30.2525 42.5938C27.4738 42.5938 24.9616 42.0038 22.7158 40.8238C20.5081 39.6438 18.7571 37.9499 17.463 35.7422C16.1688 33.4964 15.5217 30.7939 15.5217 27.6346C15.5217 24.5514 16.1688 21.9059 17.463 19.6982C18.7952 17.4524 20.5081 15.7205 22.6016 14.5024C24.6951 13.2844 26.9029 12.6754 29.2248 12.6754C32.0415 12.6754 34.3634 13.3034 36.1905 14.5595C38.0557 15.7776 39.426 17.4334 40.3014 19.5269C41.215 21.6204 41.6717 23.9423 41.6717 26.4926C41.6717 27.3301 41.6147 28.1484 41.5005 28.9478C41.4243 29.7091 41.3482 30.261 41.2721 30.6036H24.9997C25.4564 32.3165 26.2748 33.5155 27.4548 34.2006C28.6348 34.8477 30.0241 35.1713 31.6228 35.1713C33.4499 35.1713 35.3912 34.6003 37.4466 33.4584L40.644 39.2822C39.1215 40.348 37.4086 41.1664 35.5054 41.7373C33.6022 42.3083 31.8512 42.5938 30.2525 42.5938ZM24.8855 24.2088H33.3357C33.3357 23.1049 33.0502 22.1533 32.4793 21.354C31.9464 20.5166 30.9377 20.0979 29.4532 20.0979C28.3874 20.0979 27.4358 20.4214 26.5984 21.0685C25.7609 21.7156 25.19 22.7624 24.8855 24.2088Z" fill="black"/>
<path d="M47.0598 41.9086V13.3605H55.0532L55.7384 16.8434H55.9668C57.1087 15.7395 58.3267 14.7689 59.6209 13.9315C60.9532 13.0941 62.5899 12.6754 64.5312 12.6754C66.4725 12.6754 68.0712 13.075 69.3273 13.8744C70.6215 14.6357 71.6492 15.7586 72.4105 17.2431C73.5905 16.025 74.8656 14.9592 76.2359 14.0457C77.6062 13.1321 79.262 12.6754 81.2033 12.6754C84.3626 12.6754 86.6465 13.7412 88.0548 15.8727C89.5013 17.9663 90.2245 20.783 90.2245 24.323V41.9086H80.4039V25.5791C80.4039 23.752 80.1756 22.534 79.7188 21.9249C79.262 21.3159 78.5388 21.0114 77.5491 21.0114C76.3311 21.0114 74.9988 21.7346 73.5524 23.1811V41.9086H63.7318V25.5791C63.7318 23.752 63.5035 22.534 63.0467 21.9249C62.5899 21.3159 61.8667 21.0114 60.877 21.0114C59.659 21.0114 58.3267 21.7346 56.8803 23.1811V41.9086H47.0598Z" fill="black"/>
<path d="M96.6286 41.9086V13.3605H104.622L105.307 16.8434H105.536C106.678 15.7395 107.896 14.7689 109.19 13.9315C110.522 13.0941 112.159 12.6754 114.1 12.6754C116.041 12.6754 117.64 13.075 118.896 13.8744C120.19 14.6357 121.218 15.7586 121.979 17.2431C123.159 16.025 124.434 14.9592 125.805 14.0457C127.175 13.1321 128.831 12.6754 130.772 12.6754C133.931 12.6754 136.215 13.7412 137.624 15.8727C139.07 17.9663 139.793 20.783 139.793 24.323V41.9086H129.973V25.5791C129.973 23.752 129.744 22.534 129.288 21.9249C128.831 21.3159 128.108 21.0114 127.118 21.0114C125.9 21.0114 124.568 21.7346 123.121 23.1811V41.9086H113.301V25.5791C113.301 23.752 113.072 22.534 112.616 21.9249C112.159 21.3159 111.436 21.0114 110.446 21.0114C109.228 21.0114 107.896 21.7346 106.449 23.1811V41.9086H96.6286Z" fill="black"/>
<path d="M159.444 42.5938C156.665 42.5938 154.153 42.0038 151.907 40.8238C149.699 39.6438 147.948 37.9499 146.654 35.7422C145.36 33.4964 144.713 30.7939 144.713 27.6346C144.713 24.5514 145.36 21.9059 146.654 19.6982C147.986 17.4524 149.699 15.7205 151.793 14.5024C153.886 13.2844 156.094 12.6754 158.416 12.6754C161.233 12.6754 163.555 13.3034 165.382 14.5595C167.247 15.7776 168.617 17.4334 169.493 19.5269C170.406 21.6204 170.863 23.9423 170.863 26.4926C170.863 27.3301 170.806 28.1484 170.692 28.9478C170.616 29.7091 170.54 30.261 170.463 30.6036H154.191C154.648 32.3165 155.466 33.5155 156.646 34.2006C157.826 34.8477 159.215 35.1713 160.814 35.1713C162.641 35.1713 164.582 34.6003 166.638 33.4584L169.835 39.2822C168.313 40.348 166.6 41.1664 164.697 41.7373C162.793 42.3083 161.043 42.5938 159.444 42.5938ZM154.077 24.2088H162.527C162.527 23.1049 162.242 22.1533 161.671 21.354C161.138 20.5166 160.129 20.0979 158.644 20.0979C157.579 20.0979 156.627 20.4214 155.79 21.0685C154.952 21.7156 154.381 22.7624 154.077 24.2088Z" fill="black"/>
<path d="M186.643 42.5938C183.103 42.5938 180.267 41.2615 178.135 38.597C176.042 35.8945 174.995 32.2403 174.995 27.6346C174.995 24.5133 175.547 21.8488 176.651 19.6411C177.793 17.3953 179.258 15.6824 181.047 14.5024C182.836 13.2844 184.701 12.6754 186.643 12.6754C188.203 12.6754 189.478 12.9418 190.468 13.4747C191.496 13.9695 192.428 14.6547 193.266 15.5302L192.923 11.4192V2.16966H202.744V41.9086H194.75L194.065 39.2822H193.837C192.885 40.2338 191.762 41.0331 190.468 41.6802C189.174 42.2893 187.899 42.5938 186.643 42.5938ZM189.269 34.6003C190.03 34.6003 190.696 34.4671 191.267 34.2006C191.876 33.8961 192.428 33.3442 192.923 32.5448V22.0391C192.352 21.5062 191.724 21.1446 191.039 20.9543C190.354 20.764 189.688 20.6688 189.041 20.6688C188.013 20.6688 187.08 21.1827 186.243 22.2104C185.444 23.2382 185.044 25.0081 185.044 27.5204C185.044 30.0707 185.425 31.8977 186.186 33.0016C186.947 34.0674 187.975 34.6003 189.269 34.6003Z" fill="black"/>
<path d="M246.587 42.5938C244.95 42.5938 243.58 42.0228 242.476 40.8809C241.41 39.7009 240.877 38.2925 240.877 36.6558C240.877 34.9809 241.41 33.5726 242.476 32.4306C243.58 31.2887 244.95 30.7178 246.587 30.7178C248.262 30.7178 249.632 31.2887 250.698 32.4306C251.764 33.5726 252.297 34.9809 252.297 36.6558C252.297 38.2925 251.764 39.7009 250.698 40.8809C249.632 42.0228 248.262 42.5938 246.587 42.5938Z" fill="black"/>
<path d="M259.052 41.9086V13.3605H268.872V41.9086H259.052ZM263.962 9.82055C262.363 9.82055 261.069 9.38281 260.079 8.50733C259.09 7.59379 258.595 6.39478 258.595 4.91027C258.595 3.42577 259.09 2.24578 260.079 1.37031C261.069 0.456769 262.363 0 263.962 0C265.561 0 266.855 0.456769 267.845 1.37031C268.834 2.24578 269.329 3.42577 269.329 4.91027C269.329 6.39478 268.834 7.59379 267.845 8.50733C266.855 9.38281 265.561 9.82055 263.962 9.82055Z" fill="black"/>
<path d="M287.262 42.5938C283.57 42.5938 280.886 41.528 279.212 39.3964C277.575 37.2267 276.756 34.41 276.756 30.9461V21.0114H272.988V13.7031L277.327 13.3605L278.469 5.938H286.577V13.3605H293.086V21.0114H286.577V30.7749C286.577 32.3355 286.92 33.4203 287.605 34.0293C288.29 34.6384 289.089 34.9429 290.003 34.9429C290.46 34.9429 290.897 34.9048 291.316 34.8287C291.773 34.7145 292.172 34.6003 292.515 34.4861L293.999 41.566C293.276 41.7944 292.363 42.0228 291.259 42.2512C290.155 42.4796 288.823 42.5938 287.262 42.5938Z" fill="black"/>
<path d="M239.348 25.4879C239.348 27.9748 238.848 30.364 237.882 32.6269C236.917 34.8899 235.508 36.9052 233.751 38.5368C231.993 40.1684 229.929 41.3783 227.696 42.0849C225.463 42.7914 223.115 42.978 220.809 42.6322C218.503 42.2864 216.294 41.4161 214.329 40.0802C212.365 38.7444 210.693 36.9739 209.424 34.8885C208.156 32.8031 207.321 30.4513 206.976 27.9918C206.632 25.5324 206.744 23.0694 207.385 20.6787L218.572 35.9084L236.537 31.4477L239.348 25.4879Z" fill="black"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M232.411 35.5647C229.101 37.0552 225.037 37.4064 220.971 36.5239C216.901 35.6407 213.308 33.6275 210.809 30.9361C208.324 28.2609 206.708 24.64 207.383 20.7649C208.066 16.8448 210.847 14.0623 214.167 12.5675C217.478 11.077 221.542 10.7258 225.608 11.6084C229.677 12.4916 233.27 14.5048 235.77 17.1962C238.254 19.8713 239.87 23.4923 239.195 27.3674C238.513 31.2875 235.731 34.07 232.411 35.5647ZM221.728 33.0366C228.571 34.5218 234.817 31.7096 235.68 26.7554C236.542 21.8011 231.694 16.5809 224.851 15.0957C218.008 13.6105 211.761 16.4227 210.899 21.3769C210.036 26.3311 214.885 31.5514 221.728 33.0366Z" fill="black"/>
<path d="M212.924 22.5371C212.134 22.0123 212.126 21.1505 212.906 20.6121C213.686 20.0738 214.959 20.0628 215.749 20.5876L220.767 23.9215C221.556 24.4463 221.564 25.3082 220.785 25.8465C220.005 26.3848 218.732 26.3958 217.942 25.871L212.924 22.5371Z" fill="black"/>
<path d="M218.926 18.3944C218.136 17.8696 218.128 17.0078 218.908 16.4695C219.688 15.9311 220.961 15.9201 221.751 16.4449L226.769 19.7788C227.558 20.3036 227.566 21.1655 226.786 21.7038C226.007 22.2422 224.734 22.2531 223.944 21.7283L218.926 18.3944Z" fill="black"/>
<path d="M221.406 27.5772C220.481 28.2158 220.48 29.2569 221.593 29.729C223.003 30.3272 224.579 30.689 226.16 30.764C228.486 30.8742 230.634 30.3551 232.133 29.3211C233.631 28.287 234.356 26.8226 234.149 25.25C234.008 24.1804 233.444 23.1204 232.534 22.1773C231.816 21.433 230.279 21.4532 229.354 22.0918L221.406 27.5772Z" fill="black"/>
</svg>
                        {/* </Box> */}
                    </Box>
                    <Box flexShrink={1} flexGrow={1} transition="0.5s"/>
                    <Box flexShrink={0}>
                        {isDesktop && renderDesktopMenu()}
                    </Box>
                    <Box flexShrink={1} flexGrow={scrolled ? 0 : 1} transition="0.5s ease"/>
                    {isMobileOrTablet && renderMobileMenu()}
                </Box>
                    {renderMobileOverlay()}
            {/* </Container> */}
            {/* <Box position="fixed" width="100%" left={0} top={0} background={backgroundColor} transition="0.5s ease" zIndex={1000}>
                <Container>
                    <Box margin={barMargin} display="flex" alignItems="center">
                        <Box maxWidth={scrolled ? '500px' : '0'} transform={scrolled ? 'scale(1)' : 'scale(0)'} overflow="hidden" transition="0.5s ease">
                            <Typography variant="heading2" animatedGradient noWrap>{Content.Name}</Typography>
                        </Box>
                        <Box flexShrink={1} flexGrow={1} transition="0.5s"/>
                        <Box flexShrink={0}>
                            {renderDesktopMenu()}
                        </Box>
                        <Box flexShrink={1} flexGrow={scrolled ? 0 : 1} transition="0.5s ease"/>
                        {renderMobileMenu()}
                    </Box>
                </Container>
                {renderMobileOverlay()}
            </Box> */}
        </React.Fragment>
    )
}