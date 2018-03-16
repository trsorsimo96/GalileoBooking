package gtw.galileo.booking.repository.search;

import gtw.galileo.booking.domain.Passenger;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Passenger entity.
 */
public interface PassengerSearchRepository extends ElasticsearchRepository<Passenger, Long> {
}
