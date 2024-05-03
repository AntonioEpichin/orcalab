const LogoSection = () => {



    return (<Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
        <Image
            src="/logo.webp"
            alt="Logotipo"
            width={50}
            height={50}
            layout="fixed"
            quality={100}
            style={{ borderRadius: '50%', margin: 0, display: 'block' }}
        />
    </Box>)
}

export default LogoSection;