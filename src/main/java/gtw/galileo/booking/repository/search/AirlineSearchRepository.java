package gtw.galileo.booking.repository.search;

import gtw.galileo.booking.domain.Airline;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Airline entity.
 */
public interface AirlineSearchRepository extends ElasticsearchRepository<Airline, Long> {
}
