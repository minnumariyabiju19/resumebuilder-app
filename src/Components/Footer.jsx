import React from 'react'
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <>
         <Box
      component="footer"
      sx={{
        backgroundColor: "#212529",
        color: "white",
        mt: 8,
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            py: 5,
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "2fr 1fr 1fr",
              md: "2fr 1fr 1fr 1fr",
            },
            gap: 5,
          }}
        >

          {/* Brand */}
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                mb: 2,
              }}
            >
              AI-Resume Builder
            </Typography>

            <Typography
              sx={{
                color: "#adb5bd",
                maxWidth: "400px",
                lineHeight: 1.7,
              }}
            >
              Build professional resumes with the power of AI.
              Create, edit, preview and download your resume
              in just a few minutes.
            </Typography>
          </Box>

          {/* Navigation */}
          <Box>
            <Typography
              sx={{
                fontWeight: "bold",
                mb: 2,
              }}
            >
              NAVIGATION
            </Typography>

            <Link
              to="/"
              className="text-decoration-none"
              style={{
                display: "block",
                color: "#adb5bd",
                marginBottom: "12px",
              }}
            >
              Home
            </Link>

            <Link
              to="/all-resumes"
              className="text-decoration-none"
              style={{
                display: "block",
                color: "#adb5bd",
                marginBottom: "12px",
              }}
            >
              All Resumes
            </Link>

            <Link
              to="/download"
              className="text-decoration-none"
              style={{
                display: "block",
                color: "#adb5bd",
              }}
            >
              All Downloads
            </Link>
          </Box>

          {/* Resources */}
          <Box>
            <Typography
              sx={{
                fontWeight: "bold",
                mb: 2,
              }}
            >
              RESOURCES
            </Typography>

            <Link
              to="/about"
              className="text-decoration-none"
              style={{
                display: "block",
                color: "#adb5bd",
                marginBottom: "12px",
              }}
            >
              About Us
            </Link>

            <Link
              to="/contact"
              className="text-decoration-none"
              style={{
                display: "block",
                color: "#adb5bd",
                marginBottom: "12px",
              }}
            >
              Contact Us
            </Link>

            <Link
              to="/privacy"
              className="text-decoration-none"
              style={{
                display: "block",
                color: "#adb5bd",
              }}
            >
              Privacy Policy
            </Link>
          </Box>

          {/* AI Resume */}
          <Box>
            <Typography
              sx={{
                fontWeight: "bold",
                mb: 2,
              }}
            >
              AI RESUME
            </Typography>

            <Typography
              sx={{
                color: "#adb5bd",
                lineHeight: 1.7,
              }}
            >
              Create ATS-friendly resumes with
              AI-powered suggestions and professional
              templates.
            </Typography>
          </Box>
        </Box>

        {/* Bottom */}
        <Box
          sx={{
            borderTop: "1px solid #495057",
            py: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography
            sx={{
              color: "#adb5bd",
              fontSize: "14px",
            }}
          >
            © 2026 AI-Resume Builder. All rights reserved.
          </Typography>

          <Typography
            sx={{
              color: "#adb5bd",
              fontSize: "14px",
            }}
          >
            Powered by AI
          </Typography>
        </Box>
      </Container>
    </Box>
    </>
  )
}

export default Footer
