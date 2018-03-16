package gtw.galileo.booking.repository.search;

import gtw.galileo.booking.domain.AddressInBooking;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the AddressInBooking entity.
 */
public interface AddressInBookingSearchRepository extends ElasticsearchRepository<AddressInBooking, Long> {
}
