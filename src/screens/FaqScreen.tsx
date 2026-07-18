import React from 'react';
import FaqAccordion from '../components/FaqAccordion';
import Section from '../components/Section';
import SectionTitle from '../components/SectionTitle';
import { CONTACT_INFO } from '../data/content';

export default function FaqScreen() {
  return (
    <Section>
      <SectionTitle
        kicker="Preguntas Frecuentes"
        title="¿En qué te ayudamos?"
        subtitle={`¿No encuentras tu respuesta? Llámanos al ${CONTACT_INFO.phoneDisplay} — con gusto te atendemos.`}
      />
      <FaqAccordion />
    </Section>
  );
}
