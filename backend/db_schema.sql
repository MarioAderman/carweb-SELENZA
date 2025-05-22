--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4 (Ubuntu 17.4-1.pgdg24.04+2)
-- Dumped by pg_dump version 17.4 (Ubuntu 17.4-1.pgdg24.04+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: dealership; Type: SCHEMA; Schema: -; Owner: carweb_user
--

CREATE SCHEMA dealership;


ALTER SCHEMA dealership OWNER TO carweb_user;

--
-- Name: update_vehicle_timestamp(); Type: FUNCTION; Schema: dealership; Owner: carweb_user
--

CREATE FUNCTION dealership.update_vehicle_timestamp() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;


ALTER FUNCTION dealership.update_vehicle_timestamp() OWNER TO carweb_user;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: analytics_events; Type: TABLE; Schema: dealership; Owner: carweb_user
--

CREATE TABLE dealership.analytics_events (
    id integer NOT NULL,
    session_id uuid,
    event_name character varying(100) NOT NULL,
    event_properties jsonb,
    occurred_at timestamp with time zone DEFAULT now()
);


ALTER TABLE dealership.analytics_events OWNER TO carweb_user;

--
-- Name: analytics_events_id_seq; Type: SEQUENCE; Schema: dealership; Owner: carweb_user
--

CREATE SEQUENCE dealership.analytics_events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE dealership.analytics_events_id_seq OWNER TO carweb_user;

--
-- Name: analytics_events_id_seq; Type: SEQUENCE OWNED BY; Schema: dealership; Owner: carweb_user
--

ALTER SEQUENCE dealership.analytics_events_id_seq OWNED BY dealership.analytics_events.id;


--
-- Name: sessions; Type: TABLE; Schema: dealership; Owner: carweb_user
--

CREATE TABLE dealership.sessions (
    session_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE dealership.sessions OWNER TO carweb_user;

--
-- Name: survey_responses; Type: TABLE; Schema: dealership; Owner: carweb_user
--

CREATE TABLE dealership.survey_responses (
    id integer NOT NULL,
    session_id uuid,
    details text,
    responded_at timestamp with time zone DEFAULT now(),
    source_id integer
);


ALTER TABLE dealership.survey_responses OWNER TO carweb_user;

--
-- Name: survey_responses_id_seq; Type: SEQUENCE; Schema: dealership; Owner: carweb_user
--

CREATE SEQUENCE dealership.survey_responses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE dealership.survey_responses_id_seq OWNER TO carweb_user;

--
-- Name: survey_responses_id_seq; Type: SEQUENCE OWNED BY; Schema: dealership; Owner: carweb_user
--

ALTER SEQUENCE dealership.survey_responses_id_seq OWNED BY dealership.survey_responses.id;


--
-- Name: survey_sources; Type: TABLE; Schema: dealership; Owner: carweb_user
--

CREATE TABLE dealership.survey_sources (
    id integer NOT NULL,
    name character varying(100) NOT NULL
);


ALTER TABLE dealership.survey_sources OWNER TO carweb_user;

--
-- Name: survey_sources_id_seq; Type: SEQUENCE; Schema: dealership; Owner: carweb_user
--

CREATE SEQUENCE dealership.survey_sources_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE dealership.survey_sources_id_seq OWNER TO carweb_user;

--
-- Name: survey_sources_id_seq; Type: SEQUENCE OWNED BY; Schema: dealership; Owner: carweb_user
--

ALTER SEQUENCE dealership.survey_sources_id_seq OWNED BY dealership.survey_sources.id;


--
-- Name: vehicle_images; Type: TABLE; Schema: dealership; Owner: carweb_user
--

CREATE TABLE dealership.vehicle_images (
    id integer NOT NULL,
    vehicle_id integer,
    url text NOT NULL,
    sort_order integer DEFAULT 0
);


ALTER TABLE dealership.vehicle_images OWNER TO carweb_user;

--
-- Name: vehicle_images_id_seq; Type: SEQUENCE; Schema: dealership; Owner: carweb_user
--

CREATE SEQUENCE dealership.vehicle_images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE dealership.vehicle_images_id_seq OWNER TO carweb_user;

--
-- Name: vehicle_images_id_seq; Type: SEQUENCE OWNED BY; Schema: dealership; Owner: carweb_user
--

ALTER SEQUENCE dealership.vehicle_images_id_seq OWNED BY dealership.vehicle_images.id;


--
-- Name: vehicles; Type: TABLE; Schema: dealership; Owner: carweb_user
--

CREATE TABLE dealership.vehicles (
    id integer NOT NULL,
    brand text NOT NULL,
    model text NOT NULL,
    year integer,
    price numeric(12,2) NOT NULL,
    mileage integer,
    description text,
    outer_equipment text,
    inner_equipment text,
    status character varying(20) DEFAULT 'available'::character varying,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT vehicles_year_check CHECK (((year >= 1900) AND (year <= ((EXTRACT(year FROM now()))::integer + 1))))
);


ALTER TABLE dealership.vehicles OWNER TO carweb_user;

--
-- Name: vehicles_id_seq; Type: SEQUENCE; Schema: dealership; Owner: carweb_user
--

CREATE SEQUENCE dealership.vehicles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE dealership.vehicles_id_seq OWNER TO carweb_user;

--
-- Name: vehicles_id_seq; Type: SEQUENCE OWNED BY; Schema: dealership; Owner: carweb_user
--

ALTER SEQUENCE dealership.vehicles_id_seq OWNED BY dealership.vehicles.id;


--
-- Name: analytics_events id; Type: DEFAULT; Schema: dealership; Owner: carweb_user
--

ALTER TABLE ONLY dealership.analytics_events ALTER COLUMN id SET DEFAULT nextval('dealership.analytics_events_id_seq'::regclass);


--
-- Name: survey_responses id; Type: DEFAULT; Schema: dealership; Owner: carweb_user
--

ALTER TABLE ONLY dealership.survey_responses ALTER COLUMN id SET DEFAULT nextval('dealership.survey_responses_id_seq'::regclass);


--
-- Name: survey_sources id; Type: DEFAULT; Schema: dealership; Owner: carweb_user
--

ALTER TABLE ONLY dealership.survey_sources ALTER COLUMN id SET DEFAULT nextval('dealership.survey_sources_id_seq'::regclass);


--
-- Name: vehicle_images id; Type: DEFAULT; Schema: dealership; Owner: carweb_user
--

ALTER TABLE ONLY dealership.vehicle_images ALTER COLUMN id SET DEFAULT nextval('dealership.vehicle_images_id_seq'::regclass);


--
-- Name: vehicles id; Type: DEFAULT; Schema: dealership; Owner: carweb_user
--

ALTER TABLE ONLY dealership.vehicles ALTER COLUMN id SET DEFAULT nextval('dealership.vehicles_id_seq'::regclass);


--
-- Data for Name: analytics_events; Type: TABLE DATA; Schema: dealership; Owner: carweb_user
--

COPY dealership.analytics_events (id, session_id, event_name, event_properties, occurred_at) FROM stdin;
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: dealership; Owner: carweb_user
--

COPY dealership.sessions (session_id, created_at) FROM stdin;
\.


--
-- Data for Name: survey_responses; Type: TABLE DATA; Schema: dealership; Owner: carweb_user
--

COPY dealership.survey_responses (id, session_id, details, responded_at, source_id) FROM stdin;
\.


--
-- Data for Name: survey_sources; Type: TABLE DATA; Schema: dealership; Owner: carweb_user
--

COPY dealership.survey_sources (id, name) FROM stdin;
1	Ubicación/instalaciones de la agencia
2	Publicación en Facebook Marketplace
3	Anuncio de Facebook
4	Reel de Instagram (@selenza.autos)
5	Recomendación de Google Maps
6	Referencia de clientes, amigos y/o familiares
\.


--
-- Data for Name: vehicle_images; Type: TABLE DATA; Schema: dealership; Owner: carweb_user
--

COPY dealership.vehicle_images (id, vehicle_id, url, sort_order) FROM stdin;
\.


--
-- Data for Name: vehicles; Type: TABLE DATA; Schema: dealership; Owner: carweb_user
--

COPY dealership.vehicles (id, brand, model, year, price, mileage, description, outer_equipment, inner_equipment, status, created_at, updated_at) FROM stdin;
1	JETOUR	DASHING	2024	469000.00	3000	SUV Motor 1.6 TGDI (turbo naftero con inyección directa)	Parrilla frontal estilo Dashing	Asientos de cuerto tono claro	available	2025-05-21 19:15:36.065316-06	2025-05-21 19:15:36.065316-06
2	SEAT	LEON	2018	269000.00	71000	Hatchback Motor 1.4 TSI 150 HP Tm/DSG	Quemacocos eléctrico	Asientos de tela premium	available	2025-05-21 19:19:19.910869-06	2025-05-21 19:19:19.910869-06
3	HYUNDAI	CRETA	2025	409000.00	6500	SUV Motor Gamma II 1.5L MPI Tranmisión IVT	Parrilla de radiador con insertos plateados	Asientos con cubierta de tela	available	2025-05-21 19:21:21.335709-06	2025-05-21 19:21:21.335709-06
\.


--
-- Name: analytics_events_id_seq; Type: SEQUENCE SET; Schema: dealership; Owner: carweb_user
--

SELECT pg_catalog.setval('dealership.analytics_events_id_seq', 1, false);


--
-- Name: survey_responses_id_seq; Type: SEQUENCE SET; Schema: dealership; Owner: carweb_user
--

SELECT pg_catalog.setval('dealership.survey_responses_id_seq', 1, false);


--
-- Name: survey_sources_id_seq; Type: SEQUENCE SET; Schema: dealership; Owner: carweb_user
--

SELECT pg_catalog.setval('dealership.survey_sources_id_seq', 6, true);


--
-- Name: vehicle_images_id_seq; Type: SEQUENCE SET; Schema: dealership; Owner: carweb_user
--

SELECT pg_catalog.setval('dealership.vehicle_images_id_seq', 1, false);


--
-- Name: vehicles_id_seq; Type: SEQUENCE SET; Schema: dealership; Owner: carweb_user
--

SELECT pg_catalog.setval('dealership.vehicles_id_seq', 3, true);


--
-- Name: analytics_events analytics_events_pkey; Type: CONSTRAINT; Schema: dealership; Owner: carweb_user
--

ALTER TABLE ONLY dealership.analytics_events
    ADD CONSTRAINT analytics_events_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: dealership; Owner: carweb_user
--

ALTER TABLE ONLY dealership.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (session_id);


--
-- Name: survey_responses survey_responses_pkey; Type: CONSTRAINT; Schema: dealership; Owner: carweb_user
--

ALTER TABLE ONLY dealership.survey_responses
    ADD CONSTRAINT survey_responses_pkey PRIMARY KEY (id);


--
-- Name: survey_sources survey_sources_name_key; Type: CONSTRAINT; Schema: dealership; Owner: carweb_user
--

ALTER TABLE ONLY dealership.survey_sources
    ADD CONSTRAINT survey_sources_name_key UNIQUE (name);


--
-- Name: survey_sources survey_sources_pkey; Type: CONSTRAINT; Schema: dealership; Owner: carweb_user
--

ALTER TABLE ONLY dealership.survey_sources
    ADD CONSTRAINT survey_sources_pkey PRIMARY KEY (id);


--
-- Name: vehicle_images vehicle_images_pkey; Type: CONSTRAINT; Schema: dealership; Owner: carweb_user
--

ALTER TABLE ONLY dealership.vehicle_images
    ADD CONSTRAINT vehicle_images_pkey PRIMARY KEY (id);


--
-- Name: vehicles vehicles_pkey; Type: CONSTRAINT; Schema: dealership; Owner: carweb_user
--

ALTER TABLE ONLY dealership.vehicles
    ADD CONSTRAINT vehicles_pkey PRIMARY KEY (id);


--
-- Name: idx_events_session; Type: INDEX; Schema: dealership; Owner: carweb_user
--

CREATE INDEX idx_events_session ON dealership.analytics_events USING btree (session_id);


--
-- Name: idx_survey_session; Type: INDEX; Schema: dealership; Owner: carweb_user
--

CREATE INDEX idx_survey_session ON dealership.survey_responses USING btree (session_id);


--
-- Name: idx_vehicles_status; Type: INDEX; Schema: dealership; Owner: carweb_user
--

CREATE INDEX idx_vehicles_status ON dealership.vehicles USING btree (status);


--
-- Name: vehicles trg_update_vehicle_timestamp; Type: TRIGGER; Schema: dealership; Owner: carweb_user
--

CREATE TRIGGER trg_update_vehicle_timestamp BEFORE UPDATE ON dealership.vehicles FOR EACH ROW EXECUTE FUNCTION dealership.update_vehicle_timestamp();


--
-- Name: analytics_events analytics_events_session_id_fkey; Type: FK CONSTRAINT; Schema: dealership; Owner: carweb_user
--

ALTER TABLE ONLY dealership.analytics_events
    ADD CONSTRAINT analytics_events_session_id_fkey FOREIGN KEY (session_id) REFERENCES dealership.sessions(session_id) ON DELETE CASCADE;


--
-- Name: survey_responses fk_source_id; Type: FK CONSTRAINT; Schema: dealership; Owner: carweb_user
--

ALTER TABLE ONLY dealership.survey_responses
    ADD CONSTRAINT fk_source_id FOREIGN KEY (source_id) REFERENCES dealership.survey_sources(id) ON DELETE SET NULL;


--
-- Name: survey_responses survey_responses_session_id_fkey; Type: FK CONSTRAINT; Schema: dealership; Owner: carweb_user
--

ALTER TABLE ONLY dealership.survey_responses
    ADD CONSTRAINT survey_responses_session_id_fkey FOREIGN KEY (session_id) REFERENCES dealership.sessions(session_id) ON DELETE CASCADE;


--
-- Name: survey_responses survey_responses_source_id_fkey; Type: FK CONSTRAINT; Schema: dealership; Owner: carweb_user
--

ALTER TABLE ONLY dealership.survey_responses
    ADD CONSTRAINT survey_responses_source_id_fkey FOREIGN KEY (source_id) REFERENCES dealership.survey_sources(id) ON DELETE SET NULL;


--
-- Name: vehicle_images vehicle_images_vehicle_id_fkey; Type: FK CONSTRAINT; Schema: dealership; Owner: carweb_user
--

ALTER TABLE ONLY dealership.vehicle_images
    ADD CONSTRAINT vehicle_images_vehicle_id_fkey FOREIGN KEY (vehicle_id) REFERENCES dealership.vehicles(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

