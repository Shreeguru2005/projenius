import React from "react";
import Reveal from "../Components/Reveal";
import HeroSection from "../Components/HeroSection";
import AboutSection from "../Components/AboutSection";
import ServiceSection from "../Components/ServicesSection";
import ProjectSection from "../Components/ProjectSection";
import ProductSection from "../Components/ProductSection";
import TeamSection from "../Components/TeamSection";
import TraningSection from "../Components/TrainingSection";
import ContactSection from "../Components/ContactSection";
import FooterTopSection from "../Components/FooterTopSection";
import PriceTableSection from "../Components/PriceTableSection";

export default function Home() {

  return (
    <div>
      <Reveal width="100%"><HeroSection /></Reveal>
      <Reveal width="100%" delay={0.05}><AboutSection /></Reveal>
      <Reveal width="100%" delay={0.08}><ServiceSection /></Reveal>
      <Reveal width="100%" delay={0.11}><ProjectSection /></Reveal>
      <Reveal width="100%" delay={0.14}><ProductSection /></Reveal>
      {/* <TeamSection /> */}
      <Reveal width="100%" delay={0.17}><TraningSection /></Reveal>
      <Reveal width="100%" delay={0.2}><ContactSection /></Reveal>
      <Reveal width="100%" delay={0.23}><PriceTableSection /></Reveal>
      <Reveal width="100%" delay={0.29}><FooterTopSection /></Reveal>
    </div>
  );
}