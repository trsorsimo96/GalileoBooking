package gtw.galileo.booking.web.rest;

import gtw.galileo.booking.GalileoBookingApp;

import gtw.galileo.booking.domain.Airport;
import gtw.galileo.booking.repository.AirportRepository;
import gtw.galileo.booking.repository.search.AirportSearchRepository;
import gtw.galileo.booking.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static gtw.galileo.booking.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the AirportResource REST controller.
 *
 * @see AirportResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GalileoBookingApp.class)
public class AirportResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    @Autowired
    private AirportRepository airportRepository;

    @Autowired
    private AirportSearchRepository airportSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAirportMockMvc;

    private Airport airport;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AirportResource airportResource = new AirportResource(airportRepository, airportSearchRepository);
        this.restAirportMockMvc = MockMvcBuilders.standaloneSetup(airportResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Airport createEntity(EntityManager em) {
        Airport airport = new Airport()
            .name(DEFAULT_NAME)
            .code(DEFAULT_CODE);
        return airport;
    }

    @Before
    public void initTest() {
        airportSearchRepository.deleteAll();
        airport = createEntity(em);
    }

    @Test
    @Transactional
    public void createAirport() throws Exception {
        int databaseSizeBeforeCreate = airportRepository.findAll().size();

        // Create the Airport
        restAirportMockMvc.perform(post("/api/airports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(airport)))
            .andExpect(status().isCreated());

        // Validate the Airport in the database
        List<Airport> airportList = airportRepository.findAll();
        assertThat(airportList).hasSize(databaseSizeBeforeCreate + 1);
        Airport testAirport = airportList.get(airportList.size() - 1);
        assertThat(testAirport.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testAirport.getCode()).isEqualTo(DEFAULT_CODE);

        // Validate the Airport in Elasticsearch
        Airport airportEs = airportSearchRepository.findOne(testAirport.getId());
        assertThat(airportEs).isEqualToIgnoringGivenFields(testAirport);
    }

    @Test
    @Transactional
    public void createAirportWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = airportRepository.findAll().size();

        // Create the Airport with an existing ID
        airport.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAirportMockMvc.perform(post("/api/airports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(airport)))
            .andExpect(status().isBadRequest());

        // Validate the Airport in the database
        List<Airport> airportList = airportRepository.findAll();
        assertThat(airportList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = airportRepository.findAll().size();
        // set the field null
        airport.setName(null);

        // Create the Airport, which fails.

        restAirportMockMvc.perform(post("/api/airports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(airport)))
            .andExpect(status().isBadRequest());

        List<Airport> airportList = airportRepository.findAll();
        assertThat(airportList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = airportRepository.findAll().size();
        // set the field null
        airport.setCode(null);

        // Create the Airport, which fails.

        restAirportMockMvc.perform(post("/api/airports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(airport)))
            .andExpect(status().isBadRequest());

        List<Airport> airportList = airportRepository.findAll();
        assertThat(airportList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAirports() throws Exception {
        // Initialize the database
        airportRepository.saveAndFlush(airport);

        // Get all the airportList
        restAirportMockMvc.perform(get("/api/airports?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(airport.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())));
    }

    @Test
    @Transactional
    public void getAirport() throws Exception {
        // Initialize the database
        airportRepository.saveAndFlush(airport);

        // Get the airport
        restAirportMockMvc.perform(get("/api/airports/{id}", airport.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(airport.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAirport() throws Exception {
        // Get the airport
        restAirportMockMvc.perform(get("/api/airports/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAirport() throws Exception {
        // Initialize the database
        airportRepository.saveAndFlush(airport);
        airportSearchRepository.save(airport);
        int databaseSizeBeforeUpdate = airportRepository.findAll().size();

        // Update the airport
        Airport updatedAirport = airportRepository.findOne(airport.getId());
        // Disconnect from session so that the updates on updatedAirport are not directly saved in db
        em.detach(updatedAirport);
        updatedAirport
            .name(UPDATED_NAME)
            .code(UPDATED_CODE);

        restAirportMockMvc.perform(put("/api/airports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAirport)))
            .andExpect(status().isOk());

        // Validate the Airport in the database
        List<Airport> airportList = airportRepository.findAll();
        assertThat(airportList).hasSize(databaseSizeBeforeUpdate);
        Airport testAirport = airportList.get(airportList.size() - 1);
        assertThat(testAirport.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testAirport.getCode()).isEqualTo(UPDATED_CODE);

        // Validate the Airport in Elasticsearch
        Airport airportEs = airportSearchRepository.findOne(testAirport.getId());
        assertThat(airportEs).isEqualToIgnoringGivenFields(testAirport);
    }

    @Test
    @Transactional
    public void updateNonExistingAirport() throws Exception {
        int databaseSizeBeforeUpdate = airportRepository.findAll().size();

        // Create the Airport

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAirportMockMvc.perform(put("/api/airports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(airport)))
            .andExpect(status().isCreated());

        // Validate the Airport in the database
        List<Airport> airportList = airportRepository.findAll();
        assertThat(airportList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAirport() throws Exception {
        // Initialize the database
        airportRepository.saveAndFlush(airport);
        airportSearchRepository.save(airport);
        int databaseSizeBeforeDelete = airportRepository.findAll().size();

        // Get the airport
        restAirportMockMvc.perform(delete("/api/airports/{id}", airport.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean airportExistsInEs = airportSearchRepository.exists(airport.getId());
        assertThat(airportExistsInEs).isFalse();

        // Validate the database is empty
        List<Airport> airportList = airportRepository.findAll();
        assertThat(airportList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchAirport() throws Exception {
        // Initialize the database
        airportRepository.saveAndFlush(airport);
        airportSearchRepository.save(airport);

        // Search the airport
        restAirportMockMvc.perform(get("/api/_search/airports?query=id:" + airport.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(airport.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Airport.class);
        Airport airport1 = new Airport();
        airport1.setId(1L);
        Airport airport2 = new Airport();
        airport2.setId(airport1.getId());
        assertThat(airport1).isEqualTo(airport2);
        airport2.setId(2L);
        assertThat(airport1).isNotEqualTo(airport2);
        airport1.setId(null);
        assertThat(airport1).isNotEqualTo(airport2);
    }
}
