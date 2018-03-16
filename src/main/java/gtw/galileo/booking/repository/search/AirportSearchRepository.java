package gtw.galileo.booking.repository.search;

import gtw.galileo.booking.domain.Airport;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Airport entity.
 */
public interface AirportSearchRepository extends ElasticsearchRepository<Airport, Long> {
}
